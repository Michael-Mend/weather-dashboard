$('#srchbtn').click(function(){
    var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?id=524901&appid=06e67d1c01fd425c507533b8a4c46d90&q=' + srchbx.value;

    console.log(queryUrl);

    $.ajax({
        url: queryUrl,
        method: 'get'
    }).then(function(res) {
        $('#city').html(res.name);
        $('#temp').html(Math.floor(res.main.temp * 1.8 - 459.76));
        $('#humid').html(res.main.humidity + '%');
        $('#wind').html(res.wind.speed + ' mph');
        $('#uv').html();
        console.log(srchbx.value)
        console.log(res)
        console.log(res.name)
    });
});
