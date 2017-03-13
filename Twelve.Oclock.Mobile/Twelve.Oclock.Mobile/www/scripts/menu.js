$(document).on("pagecreate", "#demo-page", function () {
    $(document).on("swipeleft swiperight", "#demo-page", function (e) {
        if ($(".ui-page-active").jqmData("panel") != "open") {
            if (e.type === "swiperight") {
                $("#left-panel").panel("open");
            }
        }
    });
});