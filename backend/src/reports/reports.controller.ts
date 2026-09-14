import { Controller, Get, UseGuards } from '@nestjs/common';

import { ReportsService } from './reports.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

import { Res } from '@nestjs/common';
import type { Response } from 'express';
import { convertToCSV } from './utils/csv.util';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @Roles('ADMIN', 'AGENT')
  getReports(
    @CurrentUser()
    currentUser: AuthenticatedUser,
  ) {
    return this.reportsService.getReports(currentUser);
  }

  @Get('fields/export')
  @Roles('ADMIN', 'AGENT')
  async exportFields(
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: Response,
  ) {
    const data = await this.reportsService.getFieldsReport(user);

    if (data.length === 0) {
      res.header('Content-Type', 'text/csv');
      res.attachment('fields-report.csv');
      res.send('No data available for this report.');
      return;
    }

    const csv = convertToCSV(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('fields-report.csv');
    res.send(csv);
  }

  @Get('crops/export')
  @Roles('ADMIN', 'AGENT')
  async exportCrops(
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: Response,
  ) {
    const data = await this.reportsService.getCropsReport(user);
    const csv = convertToCSV(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('crops-report.csv');
    res.send(csv);
  }

  @Get('alerts/export')
  @Roles('ADMIN', 'AGENT')
  async exportAlerts(
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: Response,
  ) {
    const data = await this.reportsService.getAlertsReport(user);
    const csv = convertToCSV(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('alerts-report.csv');
    res.send(csv);
  }

  @Get('analytics/export')
  @Roles('ADMIN', 'AGENT')
  async exportAnalytics(
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: Response,
  ) {
    const report = await this.reportsService.getReports(user);
    const csv = convertToCSV(report.crops);
    res.header('Content-Type', 'text/csv');
    res.attachment('analytics-report.csv');
    res.send(csv);
  }

  @Get('export')
  @Roles('ADMIN', 'AGENT')
  async exportCombined(
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: Response,
  ) {
    const [fields, crops, alerts, report] = await Promise.all([
      this.reportsService.getFieldsReport(user),
      this.reportsService.getCropsReport(user),
      this.reportsService.getAlertsReport(user),
      this.reportsService.getReports(user),
    ]);

    const sections: string[] = [];

    sections.push('FIELDS');
    sections.push(fields.length ? convertToCSV(fields) : 'No data available.');

    sections.push('\nCROPS');
    sections.push(crops.length ? convertToCSV(crops) : 'No data available.');

    sections.push('\nALERTS');
    sections.push(alerts.length ? convertToCSV(alerts) : 'No data available.');

    sections.push('\nANALYTICS');
    sections.push(
      report.crops.length ? convertToCSV(report.crops) : 'No data available.',
    );

    const csv = sections.join('\n');

    res.header('Content-Type', 'text/csv');
    res.attachment('smartseason-report.csv');
    res.send(csv);
  }
}
