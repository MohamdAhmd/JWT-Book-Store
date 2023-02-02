import User from '../types/user.type'
export type audit = {
  auditAction: string
  data?: User    
  auditBy: string
  auditOn: string
  status: number
  error: Error
}

export class Audit {
  auditAction
  data
  status
  error
  auditBy
  auditOn
  constructor(
    auditAction: string,
    data: User,
    auditBy: string,
    auditOn: string,
    status: number,
    error: Error | null
  ) {
    this.auditAction = auditAction
    this.data = data
    this.auditBy = auditBy
    this.auditOn = auditOn
    this.status = status
    this.error = error
  }
}
