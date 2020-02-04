$('#date').html(moment().format(' MMMM Do YYYY'))

$('#srchbtn').click(function(){
    var cwQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=06e67d1c01fd425c507533b8a4c46d90&q=' + srchbx.value;
    var fdQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?appid=06e67d1c01fd425c507533b8a4c46d90&q=' + srchbx.value;

    $.ajax({
        url: cwQueryUrl,
        method: 'get'
    }).then(function(res) {
        console.log(res);
        $('#city').html(res.name + ', ' + res.sys.country);
        $('#temp').html(Math.floor(res.main.temp * 1.8 - 459.76) + ' &#176;F');
        $('#humid').html(res.main.humidity + '%');
        $('#wind').html(res.wind.speed + ' mph');
    });
    $.ajax({
        url: fdQueryUrl,
        method: 'get'
    }).then(function(res) {
        console.log(moment().format('D') + 1);
        console.log(res.list[6].main.humidity);
        console.log(Math.floor(res.list[6].main.temp * 1.8 -459.76));
    })
});
