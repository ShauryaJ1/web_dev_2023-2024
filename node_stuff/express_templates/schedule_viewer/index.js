const express = require('express')
const app = express()
const schedule = {
    "count": 110,
    "next": "https://ion.tjhsst.edu/api/schedule?page=5",
    "previous": "https://ion.tjhsst.edu/api/schedule?page=3",
    "results": [
        {
            "url": "https://ion.tjhsst.edu/api/schedule/2022-09-01",
            "date": "2022-09-01",
            "day_type": {
                "name": "Blue Day",
                "special": false,
                "blocks": [
                    {
                        "order": 1,
                        "name": "Period 1",
                        "start": "8:40",
                        "end": "10:15"
                    },
                    {
                        "order": 2,
                        "name": "Period 2",
                        "start": "10:25",
                        "end": "12:00"
                    },
                    {
                        "order": 3,
                        "name": "Lunch",
                        "start": "12:00",
                        "end": "12:40"
                    },
                    {
                        "order": 4,
                        "name": "Period 3",
                        "start": "12:40",
                        "end": "14:15"
                    },
                    {
                        "order": 5,
                        "name": "Period 4",
                        "start": "14:25",
                        "end": "16:00"
                    }
                ]
            }
        }
    ]
}

app.set("view engine", "ejs")

app.get("/schedule_template",function(req,res){
    let count = schedule.count
    let next = schedule.next
    let previous = schedule.previous
    let url = schedule.results[0].url
    let date = schedule.results[0].date
    let day_type = schedule.results[0].day_type.name
    let blocks = schedule.results[0].day_type.blocks
    let block_names = []
    let block_starts = []
    let block_ends = []
    for (const block of blocks){
        block_names.push(block.name)
        block_starts.push(block.start)
        block_ends.push(block.end) 
    }
    const render_dictionary = {
        'count' : count,
        'next' : next,
        'previous': previous,
        'url': url,
        'date': date,
        'day_type': day_type,
        'block_names': block_names,
        'block_starts': block_starts,
        'block_ends': block_ends

    }
    res.render("schedule_template",render_dictionary)
})
const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
  });