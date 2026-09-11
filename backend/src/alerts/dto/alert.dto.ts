export class  AlertCandidate {
  type: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
}

export class FieldUpdateSnapshot {
  moisture: number | null;
  temperature: number | null;
  createdAt: Date;
}
