$('#date').html(moment().format(' MMMM Do YYYY'))

$('#srchbtn').click(function(){
    var cwQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=06e67d1c01fd425c507533b8a4c46d90&q=' + srchbx.value;
    var fdQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?appid=06e67d1c01fd425c507533b8a4c46d90&q=' + srchbx.value;
    var fdIndex =  [6,14,22,30,38];

    $.ajax({
        url: cwQueryUrl,
        method: 'get'
    }).then(function(res) {
        $('#city').html(res.name + ', ' + res.sys.country);
        $('#temp').html(Math.floor(res.main.temp * 1.8 - 459.76) + ' &#176;F');
        $('#humid').html(res.main.humidity + '%');
        $('#wind').html(res.wind.speed + ' mph');

        var uvQueryUrl = 'http://api.openweathermap.org/data/2.5/uvi?appid=06e67d1c01fd425c507533b8a4c46d90&lat='+ res.coord.lat + '&lon=' + res.coord.lon;

        $.ajax({
            url: uvQueryUrl,
            method: 'get'
        }).then(function(resp) {
            $('#uv').html(resp.value)
        })
    });
    $.ajax({
        url: fdQueryUrl,
        method: 'get'
    }).then(function(res) {
        // console.log(res.list[6].main.humidity);
        // console.log(Math.floor(res.list[6].main.temp * 1.8 -459.76));
        for (i = 0; i < 5; i++) {
            $('#day' + i).html(moment().add(1 + i, 'days').format('M/D') + '<br>' + Math.floor(res.list[fdIndex[i]].main.temp * 1.8 -459.76) + ' &#176;F<br>' + res.list[fdIndex[i]].main.humidity + '%')
        }
    })
});
