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
   var calendarList =  document.getElementsByTagName("responsive-calendar");
    Array.prototype.slice.call(calendarList, 0).forEach(function (calendar) {
        calendar.addEventListener("date-selected", function(evt) {
              var year = evt.detail.format('YYYY').toString(),
                month = evt.detail.format('MMMM').toString(),
                day = evt.detail.format('D');
           localforage.getItem("mark")
               .then(function(data){
                   if(!data){
                       var data = {};
                       data[year] = {};
                       data[year][month] = [day];
                       return localforage.setItem("mark", data);
                   }
               if(!data[year]){
                   data[year] = {}
               }
                   if( !data[year][month]){
                   data[year][month] = [];
               }
                   addOrRemove(data[year][month],day);
                   return localforage.setItem("mark", data);
               }, function(err){
               }).then(function(){
               });
        });
    });
    function addOrRemove(array, value) {
        var index = array.indexOf(value);
        if (index === -1) {
            array.push(value);
        } else {
            array.splice(index, 1);
        }
    }
})();
