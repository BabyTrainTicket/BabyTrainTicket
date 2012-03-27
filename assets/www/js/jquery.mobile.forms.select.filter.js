/*
* jQuery Mobile Framework : "selectmenu" filter extension
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
* "listview" filter extension adapted to "selectmenu" : Ali Ok - aliok@aliok.com.tr
*/
(function($, undefined ) {

$.mobile.selectmenu.prototype.options.filter = false;
$.mobile.selectmenu.prototype.options.filterTheme = "c";


$('select').live('vclick', function(){
    var select = $( this ),
        selectID = select.attr( "id" ),
        list = $( '#' + selectID + "-menu"),
	    listview = list.data( "listview" );

    if ( !select.attr('data-' + $.mobile.ns  + 'filter') === 'true') {
		return;
	}

    if(list.data('filterAdded')===true){
        return;
    }

    list.data('filterAdded', true);

	var wrapper = $( "<form>", {
        "class": "ui-listview-filter ui-bar-" + listview.options.filterTheme,
        "role": "search" } ),

		search = $( "<input>", {
				placeholder: select.jqmData('filterPlaceholder')
			})
			.attr( "data-" + $.mobile.ns + "type", "search" )
			.jqmData( "lastval", "" )
            /*.bind("keyup change", function () {

                var $this = $(this),
                    val = this.value.toLowerCase(),
                    listItems = null,
                    lastval = $this.jqmData("lastval") + "",
                    childItems = false,
                    itemtext = "",
                    item;

                //Change val as lastval for next execution
                $this.jqmData("lastval", val);

                var changeVal = val.replace(new RegExp("^" + lastval), "");

                if (val.length < lastval.length || changeVal.length != ( val.length - lastval.length )) {
                    //Removed chars or pasted something totaly different, check all items
                    listItems = list.children();
                } else {
                    //Only chars added, not removed, only use visible subset
                    listItems = list.children(":not(.ui-screen-hidden)");
                }

                if (val) {

                    // This handles hiding regular rows without the text we search for
                    // and any list dividers without regular rows shown under it

                    for (var i = listItems.length - 1; i >= 0; i--) {
                        item = $(listItems[i]);
                        itemtext = item.jqmData("filtertext") || item.text();

                        if (item.is("li:jqmData(role=list-divider)")) {

                            item.toggleClass("ui-filter-hidequeue", !childItems);

                            // New bucket!
                            childItems = false;

                        } else if (itemtext.toLowerCase().indexOf(val) === -1) {

                            //mark to be hidden
                            item.toggleClass("ui-filter-hidequeue", true);
                        } else {

                            // There"s a shown item in the bucket
                            childItems = true;
                        }
                    }

                    // Show items, not marked to be hidden
                    listItems
                        .filter(":not(.ui-filter-hidequeue)")
                        .toggleClass("ui-screen-hidden", false);

                    // Hide items, marked to be hidden
                    listItems
                        .filter(".ui-filter-hidequeue")
                        .toggleClass("ui-screen-hidden", true)
                        .toggleClass("ui-filter-hidequeue", false);

                } else {

                    //filtervalue is empty => show all
                    listItems.toggleClass("ui-screen-hidden", false);
                }
            })*/
            .bind('keyup change',function(){
                var $this = $(this),
                    val = this.value.toLowerCase(),
                    lastval = $this.jqmData("lastval")+"";

                $this.jqmData("lastval", val);

                if(val && val.length != lastval.length){
                    var filterSearch = select.data('selectmenu').options.filterSearch;
                    if(filterSearch != undefined && typeof(filterSearch) == 'function'){
                        select.empty();
                        $.each(filterSearch(val),function(){
                            select.append(new Option(this.label,this.text));
                        });
                        select.selectmenu('refresh');
                        list.listview('refresh');
                    }
                }
            })
			.appendTo( wrapper )
			.textinput();

    if (list.jqmData( "inset" ) ) {
		wrapper.addClass( "ui-listview-filter-inset" );
	}

	wrapper.bind( "submit", function() {
		return false;
	})
	.insertBefore( list );
});
}
)( jQuery );