var stateResting = {
    scale: .7,
    opacity: .5
}

var stateHover = {
    scale: 1
}

var howManySquares = 16
var lengthOfSide = 70

function drawSquares() {
    for (i = 0; i < howManySquares; i++) {
        var newCell = '<div class="cell" id="cell-' + i + '"></div>';
        $('#container').append(newCell);
        var currentCell = $('#cell-' + i);
        fadeIn(currentCell, i);
    }

    $('.cell')
        .mouseenter(
            function() {
                $(this).css({ transformOrigin: '50% 50%' });
                $(this).transition( stateHover, 150, 'easeOutQuint' );
            })
        .mouseleave(
            function() {
                $(this).css({ transformOrigin: '50% 50%' });
                $(this).transition(stateResting, 200, 'easeOutQuint' );
            })

    $('.cell').toggle(
        function() {
            var xTransformOrigin = getXTransformOrigin($(this).index())  + 'px';
            $(this)
                // .css({ transformOrigin: getTransformOrigin(this) })
                .css({ transformOrigin: xTransformOrigin + ' 0px' })
                .transition({scale: 4, opacity: .2}, 200, 'easeOutQuint' )  
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
    return (lengthOfSide * i ) / 3
}