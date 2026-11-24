import { PrismaClient, GrowthStage, AlertSeverity } from "@prisma/client";


export async function createDemoData(prisma: PrismaClient, userId: string) {
  const day = 24 * 60 * 60 * 1000;

  await prisma.field.create({
    data: {
      name: "Sample Field: Green Valley",
      crop: "Maize",
      location: "Nakuru, Kenya",
      acreage: 12.5,
      status: "Active",
      isDemo: true,
      createdById: userId,
      assignedAgentId: userId,
      crops: {
        create: {
          name: "Maize",
          variety: "H614",
          plantingDate: new Date(Date.now() - 45 * day),
          expectedHarvestDate: new Date(Date.now() + 75 * day),
          expectedGrowthStage: GrowthStage.VEGETATIVE,
          actualGrowthStage: GrowthStage.VEGETATIVE,
        },
      },
      alerts: {
        create: [
          { type: "Moisture", severity: AlertSeverity.WARNING, message: "Soil moisture dropped below 30%. Consider irrigating." },
          { type: "Growth", severity: AlertSeverity.INFO, message: "Crop reached the vegetative stage on schedule." },
        ],
      },
      fieldUpdates: {
        create: [
          { cropStage: "VEGETATIVE", notes: "Healthy leaf growth, no pests spotted.", moisture: 34, temperature: 24, humidity: 62, userId },
          { cropStage: "GERMINATION", notes: "Even germination across the field.", moisture: 41, temperature: 22, humidity: 70, userId },
        ],
      },
    },
  });

  await prisma.notification.create({
    data: {
      userId,
      title: "Welcome to SmartSeason",
      message: "We added a sample field so you can explore every page.",
      type: "info",
    },
  });
}