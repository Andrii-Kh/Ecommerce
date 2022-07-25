import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getlogs } from '../redux/reducers/log'
import Head from './Head'

const Logs = () => {
  const dispatch = useDispatch()
  const { logList } = useSelector((s) => s.log)
  useEffect(() => {
    dispatch(getlogs())
  }, [])
  return (
    <div>
      <Head />
      {logList.map((log) => (
        <div key={log?.id}>{log?.string}</div>
      ))}
    </div>
  )
}

export default React.memo(Logs)
