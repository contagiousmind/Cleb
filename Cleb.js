
var dataList = new Array();

$(function () {
    GetData('DataPoints', BuildScreen);

    // dataList.push(new data('Total', 27259, 27010));
    // dataList.push(new data('Most in a day 20260718', 833, 858));
    // dataList.push(new data('Daily Average', 247, 245));


    // BuildScreen();

});

function BuildScreen(data){

    for (i=1; i < data.values.length; i++) {

        dataList.push(new dataPoint(data.values[i][0]        // display
                        , data.values[i][1]             // C
                        , data.values[i][2]             // S
                        , data.values[i][3]             // Total
                ));
    
    }

    // dataList.push(new data('Total', 27259, 27010));
    // dataList.push(new data('Most in a day 20260718', 833, 858));
    // dataList.push(new data('Daily Average', 247, 245));


    var template = $("#Template_Tile").html();
    var html = '';


    for (i = 0; i < dataList.length; i++) {

        // use title as ID?
        var id = dataList[i].Label.replace(/ /g, '');

        html += template.replace(/\$ID\$/g, id)
                        .replace(/\$TITLE\$/g, dataList[i].Label)
                        .replace(/\$VALUE1\$/g, dataList[i].V1.toLocaleString())
                        .replace(/\$VALUE2\$/g, dataList[i].V2.toLocaleString())
                        .replace(/\$TOTAL\$/g, (dataList[i].Total).toLocaleString())
                ;
    }


    $('body').append(html);

    AnimateBars();
}


function AnimateBars() {
    for (i = 0; i < dataList.length; i++) {

        var total = (dataList[i].V1 + dataList[i].V2);
        
        var width1 = (dataList[i].V1 / total) * 100.00;
        var width2 = (dataList[i].V2 / total) * 100.00;

        if (dataList[i].V1 > dataList[i].V2) {
            width1 = 100;
            width2 = (dataList[i].V2 / dataList[i].V1) * 100.00
        } else {
            width2 = 100;
            width1 = (dataList[i].V1 / dataList[i].V2) * 100.00

        }



        var id = dataList[i].Label.replace(/ /g, '');

        // set width.. could do tyhem one after the other, or just together?
        $("#Value1_" + id).css({width: width1 + '%'});
        $("#Value2_" + id).css({width: width2 + '%'});


        // add gradient animation 4 seconds after...
        // window.setTimeout(AddGradient, 4000);

    }

    // animate numbers...
    $('.valueouter span').each(function() {
        AnimateNumbers(this);
    });
    $('.total span').each(function() {
        AnimateNumbers(this);
    });
    

}

function AddGradient() {
    $('.valueouter left').addClass('gradientcolor');
    //$('.rightouter').addClass('gradientcolor');
}

function AnimateNumbers(el) {
    $({ Counter: 0 }).animate({
        Counter: $(el).text().replace(',','')
    }, {
        duration: 4100,
        easing: 'swing',
        step: function () {
            $(el).text(Math.ceil(this.Counter).toLocaleString());
        }
    })
}


function GetData(sheetName, completeEvent) {

        // photo's key - AIzaSyBnvRLQ5Wfv5MNb5q0APNsijA9xXpOYnaA
    var aaa = 'AIzaSyBnvRLQ5Wfv5MNb5q0APNsijA9xXpOYnaA'; 
    var spreadsheetId = '1_aLhYW9CZNwX_hFce-f7sOj-sjyNroAkOGMT4mrJfpU'; // Replace with your spreadsheet ID
    // var sheetName = 'Sheet1'; // Replace with your sheet name
    var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${aaa}`;


    Ajax(url, function(data) {
        completeEvent.call('', data);
        
    }, '');
}

//https://github.com/orgs/community/discussions/108921
function Ajax(url, completeEvent, args) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            completeEvent.call(this, data);
        }
    });
}



function dataPoint(label, v1, v2, total) {
    this.Label = label;
    this.V1 = v1;
    this.V2 = v2;
    this.Total = total;
}