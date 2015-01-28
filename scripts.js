var stateResting = {
    scale: .7,
    opacity: .5
}

var stateHover = {
    scale: 1
}

var howManySquares = 4;
var lengthOfSide = 100;

function drawSquares() {
    for (i = 0; i < howManySquares; i++) {
        var newCell = '<div class="cell" id="cell-' + i + '">' + i + '</div>';
        $('.frame').append(newCell);
        var currentCell = $('#cell-' + i);
        fadeIn(currentCell, i);
    }

    $('.cell')
        .mouseenter(
            function() {
                if (!$(this).hasClass('zoomed') ) {
                    // $(this).css({ transformOrigin: '50% 50%' });
                    $(this).transition( stateHover, 150, 'easeOutQuint' );
                }
            })
        .mouseleave(
            function() {
                if (!$(this).hasClass('zoomed') ) {
                    // $(this).css({ transformOrigin: '50% 50%' });
                    // $(this).transition(stateResting, 200, 'easeOutQuint' );
                }
            })

    $('.cell').toggle(
        function() {
            var xTransformOrigin = getXTransformOrigin($(this).index())  + 'px';
            $(this)
                .css({ transformOrigin: xTransformOrigin + ' -33.3%' })
                .transition({scale: 4, opacity: 1}, 200, 'easeOutQuint' )  
                .css('z-index', '5');
            $(this).addClass('zoomed');
        },
        function() {
            $(this).transition(stateHover, 100, 'easeOutQuint' );
            // $(this).css({ transformOrigin: '50% 50%' })
        }
    )
}

function fadeIn(currentCell, i) {
    setTimeout(
        function() {
            currentCell
                .transition({scale: 0})
                .transition({opacity: 1, scale: 1.3}, 500, 'snap')
                .transition({opacity: .5, scale: .7 }, 250, 'snap');
        },
        8 * i
    )
}

function getXTransformOrigin(i) {
    i = i - 1
    return (lengthOfSide * i ) / 3
}