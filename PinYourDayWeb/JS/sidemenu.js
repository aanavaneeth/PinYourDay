/**
 * Created by Navaneeth on 16/11/2014.
 */
(function(){

    //Add events to menu items
    var buttonsList = document.querySelectorAll("core-item paper-button"),
        buttons = Array.prototype.slice.call(buttonsList,0);
    buttons.forEach(function(button){
        button.addEventListener("click", function(evt){
            document.getElementById("scaff").shadowRoot
                .getElementsByTagName("core-drawer-panel")[0].setAttribute("selected", "main");
            var id = evt.target.getAttribute("id");
            Array.prototype.slice.call(document.querySelectorAll("core-scaffold div:not([data-menuassociation='"+ id+"'])"),0)
                .forEach(function(node){
                    node.style.display = "none";
                });
            document.querySelector("core-scaffold div[data-menuassociation='"+ id+"']").style.display = "block";
        },false);
    });

    //display overlay for adding event
    var addCalendarButton = document.getElementById("addCalendar"),
        appMenu = document.getElementById("appmenu"),
        overlay = document.getElementById("overlay"),
        addEventButton = document.getElementById("addEventButton"),
        eventvalue = document.getElementById("eventvalue");
    addCalendarButton.addEventListener("click", function(){
        overlay.open();
    }, false);

    //Adding event
    addEventButton.addEventListener("click",function(){
        if(!!eventvalue.value){
        appMenu.innerHTML += ("<core-item> <paper-button id='item2'  class='blue-ripple'>"+eventvalue.value +"</paper-button></core-item>");
        }
        eventvalue.value = "";
        overlay.close();

        //localforage.getItem("MarkYourDayLocalDB")
        //    .then(function(data){
        //        if(!data){
        //            var data = {};
        //            return localforage.setItem("MarkYourDayLocalDB", data);
        //        }
        //
        //    }, function(err){
        //    });
    }, false);


    //Add events to calendars
   var calendarList =  document.getElementsByTagName("responsive-calendar");
    Array.prototype.slice.call(calendarList, 0).forEach(function (calendar) {
        calendar.addEventListener("date-selected", function(evt) {
            var momentObj = evt.detail;
            console.log(momentObj.format("DD-MM-YYYY"));
        });
    });
})();
