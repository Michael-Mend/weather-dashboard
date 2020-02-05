function search() {
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
        $('.days').html('');
        $('#tdIcon').attr('src', 'https://openweathermap.org/img/wn/' + res.weather[0].icon + '@2x.png');

        var uvQueryUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=06e67d1c01fd425c507533b8a4c46d90&lat='+ res.coord.lat + '&lon=' + res.coord.lon;
       
        $.ajax({
            url: uvQueryUrl,
            method: 'get'
        }).then(function(resp) {
            $('#uv').html(resp.value)
            if (resp.value <= 3) {
                $('#uv').attr('class', 'grn')
            } else if (resp.value <= 6 && resp.value > 3) {
                $('#uv').attr('class', 'ylw')
            } else if (resp.value <= 8 && resp.value > 6) {
                $('#uv').attr('class', 'org')
            } else {
                $('#uv').attr('class', 'red')
            }
        })
    });
    $.ajax({
        url: fdQueryUrl,
        method: 'get'
    }).then(function(res) {
        for (i = 0; i < 5; i++) {
            $('.days').append('<div class="col-sm-3 day">' + moment().add(1 + i, 'days').format('MMMM Do') + '<img class="fdIcon"><br> Temp: ' + Math.floor(res.list[fdIndex[i]].main.temp * 1.8 -459.76) + ' &#176;F<br> Humidity: ' + res.list[fdIndex[i]].main.humidity + '%</div>');
            $('.fdIcon').attr('src', 'https://openweathermap.org/img/wn/' + res.list[fdIndex[i]].weather[i].icon + '.png')
        }
    });
};

function save() {
    
};

search();
$('#date').html(moment().format(' MMMM Do YYYY'))
$('#srchbtn').click(function(){
    search();
    save();
});
$('#srchbx').keypress(function(e){
    var keycode = (e.keyCode);
    if(keycode == '13'){
        search();
        save();
    }
})    