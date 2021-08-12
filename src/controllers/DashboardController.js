const Job = require('../model/Job')
const JobUtils = require ('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
async index(req, res) {

const jobs = await Job.get()
const profile = await Profile.get()

let statusCount = {
    progress: 0, 
    done: 0, 
    total: jobs.length
}
// qtd total de horas por dia de cada Job em andamento
let jobTotalHours = 0


const updatedJobs = jobs.map((job) => {
    const remaining = JobUtils.remainingDays(job)
    // if ternário na linha de baixo
    const status = remaining <= 0 ? 'done' : 'progress'
    
    
    // ... - espalhamento
    
    // status = done 
    // statusCount[done] += 1
    // statusCount[progress] += 1
    // somando a quantidade de status
    statusCount[status] += 1;

    // qtd total de horas por dia de cada Job em andamento
    jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours  
    

    return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
    }
})
// qtd de horas que quero trabalhar 
// MENOS
//  a quantidaded de horas/dia de cada job em progress

    const freeHours = profile["hours-per-day"] - jobTotalHours;


return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })

}
}

