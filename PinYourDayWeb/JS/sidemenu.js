/**
 * Created by Navaneeth on 16/11/2014.
 */
(function(){
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
   var calendarList =  document.getElementsByTagName("paper-calendar");
    Array.prototype.slice.call(calendarList, 0).forEach(function (calendar) {
        calendar.addEventListener("date-selected", function(evt) {
            console.log(evt.detail);
        })
    });
})();
