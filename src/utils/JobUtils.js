const job = require('../model/Job')
module.exports = ({
    remainingDays(job) {
        // ajustes no job
        //calculo de tempo restante
        // .toFixed para arredondar o número do prazo
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDate = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDate - Date.now()
        // transformar milisegundos em dias 
        // QUANTIDADE DE MILISEGUNDOS DO DIA 86400000
        const dayInMs = 1000 * 60 * 60 * 24
        // math.Floor - vai arredontar para menos 12.9 = 12
        // toFixed  - vai arredontar para mais a partir do meio 1.5 = 2 | 1.4 = 1
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

        // restam x dias
        return dayDiff
    },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
})