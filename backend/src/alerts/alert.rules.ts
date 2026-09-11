import { AlertCandidate, FieldUpdateSnapshot } from "./dto/alert.dto";

export function detectMoistureAlerts(
  recentUpdates: FieldUpdateSnapshot[], 
): AlertCandidate[] {
  const alerts: AlertCandidate[] = [];
  const latest = recentUpdates[0];

  if (latest?.moisture !== null && latest?.moisture !== undefined) {
    if (latest.moisture < 15) {
      alerts.push({
        type: 'CRITICAL_MOISTURE',
        severity: 'CRITICAL',
        message: `Soil moisture is critically low at ${latest.moisture}%. Immediate attention is required.`,
      });
    } else if (latest.moisture < 30) {
      alerts.push({
        type: 'LOW_MOISTURE',
        severity: 'WARNING',
        message: `Soil moisture is low at ${latest.moisture}%.`,
      });
    }
  }

  
  const lastThree = recentUpdates
    .slice(0, 3)
    .map((u) => u.moisture)
    .filter((m): m is number => m !== null);

  if (lastThree.length === 3) {
    const [newest, middle, oldest] = lastThree;
    const isDecreasing = oldest > middle && middle > newest;
    const totalDrop = oldest - newest;

    if (isDecreasing && totalDrop >= 15) {
      alerts.push({
        type: 'RAPID_MOISTURE_DECLINE',
        severity: 'CRITICAL',
        message: `Moisture is rapidly decreasing: ${oldest}% → ${middle}% → ${newest}%.`,
      });
    }
  }

  return alerts;
}

export function detectTemperatureAlerts(
  latest: FieldUpdateSnapshot | undefined,
): AlertCandidate[] {
  const alerts: AlertCandidate[] = [];

  if (latest?.temperature !== null && latest?.temperature !== undefined) {
    if (latest.temperature > 40) {
      alerts.push({
        type: 'EXTREME_TEMPERATURE',
        severity: 'CRITICAL',
        message: `Temperature is extreme at ${latest.temperature}°C.`,
      });
    } else if (latest.temperature > 35) {
      alerts.push({
        type: 'HIGH_TEMPERATURE',
        severity: 'WARNING',
        message: `Temperature is elevated at ${latest.temperature}°C.`,
      });
    }
  }

  return alerts;
}

export function detectOverdueUpdateAlert(
  latestUpdateDate: Date | null,
): AlertCandidate[] {
  if (!latestUpdateDate) {
    return [
      {
        type: 'NO_UPDATES',
        severity: 'WARNING',
        message: 'No field updates have ever been recorded for this field.',
      },
    ];
  }

  const daysSinceUpdate =
    (Date.now() - latestUpdateDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceUpdate > 14) {
    return [
      {
        type: 'OVERDUE_UPDATE',
        severity: 'WARNING',
        message: `No field update has been submitted in ${Math.floor(daysSinceUpdate)} days.`,
      },
    ];
  }

  return [];
}

export function detectRainMoistureConflict(
  moisture: number | null,
  chanceOfRain: number | null,
): AlertCandidate[] {
  if (
    moisture !== null &&
    moisture > 80 &&
    chanceOfRain !== null &&
    chanceOfRain >= 70
  ) {
    return [
      {
        type: 'FLOOD_RISK',
        severity: 'WARNING',
        message:
          'Heavy rainfall is expected while soil moisture is already high. Risk of waterlogging.',
      },
    ];
  }
  return [];
}