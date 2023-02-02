import events from 'events'
import { Audit, audit } from '../models/audit.model'
import db from '../Database'
import User from '../types/user.type'

const emitter = new events.EventEmitter()
const auditEvent = 'audit'

emitter.on(auditEvent, async function (audit: audit) {
  try {
    const values = [
      audit.auditAction,
      JSON.stringify(audit.data),
      audit.auditBy,
      audit.auditOn,
      audit.status,
      audit.error,
    ]
    const sql =
      'INSERT INTO audit (audit_action, audit_data, audit_by, audit_on, audit_status, audit_error) VALUES($1, $2, $3, $4, $5, $6)RETURNING *'
    const connection = await db.connect()
    const result = await connection.query(sql, values)
    connection.release()
    console.log('result of auditing is: ' + result.rows[0])
  } catch (error) {
    console.log('Audit event error: ' + error)
  }
})

export const prepareAudit = function (
  auditAction: string,
  data: User,
  auditBy: string,
  auditOn: string,
  error: Error | null
) {
  let status = 200
  if (error) {
    status = 500
    console.log('error from prepareAudit: ' + error)
  }
  const auditObj = new Audit(auditAction, data, auditBy, auditOn, status, error)
  emitter.emit(auditEvent, auditObj)
}

export const dateFormat = () => {
  return new Date(Date.now()).toLocaleString()
}
