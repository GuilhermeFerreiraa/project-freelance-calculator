const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
const Job = require('../model/Job')

module.exports = {

    create(req, res) {
        return res.render("job")
    },
    async save(req, res) {
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // atribuindo data de atual
        });


        //req.body = {name: 'asdd', 'daily-hours':'3.2', 'total-hours':'3'}
        return res.redirect('/') //redirecionar para o index
    },
    async show(req, res) {
        const jobId = req.params.id

        const jobs = await Job.get()
        // === é um comparativo de valor de tipo de dado
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send("Job is not Found")
        }
        const profile = await Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },
    async update(req, res) {
        const jobId = req.params.id
       
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }


        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },
    async delete(req, res) {
        const jobId = req.params.id
        await Job.delete(jobId)

        
        return res.redirect('/')
    }
}
// filter - irá retirar o objeto da função quando o objeto for false e manter quando for true
// forEach, find, map, filterFunc