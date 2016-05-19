$(Document).ready(function() {
    ("#welcome-card").show();

    $("#start-button").on('click', function(ev) {
        ev.preventDefault();
        ("#welcome-card").hide();
        var playerName = $("#player-name");

    })

}
