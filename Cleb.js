
var dataList = new Array();

$(function () {
    dataList.push(new data('Total', 45000, 40000));
    dataList.push(new data('Most in a day', 650, 700));
    dataList.push(new data('Days', 66, 65));

    
    BuildScreen();

});

function BuildScreen(){
    var template = $("#Template_Tile").html();
    var html = '';


    for (i = 0; i < dataList.length; i++) {

        // use title as ID?
        var id = dataList[i].Label.replace(/ /g, '');

        html += template.replace(/\$ID\$/g, id)
                        .replace(/\$TITLE\$/g, dataList[i].Label)
                        .replace(/\$VALUE1\$/g, dataList[i].V1.toLocaleString())
                        .replace(/\$VALUE2\$/g, dataList[i].V2.toLocaleString())
                        .replace(/\$TOTAL\$/g, (dataList[i].V1 + dataList[i].V2).toLocaleString())
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
        window.setTimeout(AddGradient, 4000);

    }

}

function AddGradient() {
    $('.leftouter').addClass('gradientcolor');
    $('.rightouter').addClass('gradientcolor');
}




function data(label, v1, v2) {
    this.Label = label;
    this.V1 = v1;
    this.V2 = v2;
}