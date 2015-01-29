// 

var cellColors = [
    '00F9FF',
    '0CFF93',
    '81FF0D',
    '0CFF93',
    '0CFF93'
]

bgColors = [
    'FFD7A9',
    'FFEAB5',
    'F2FFB5',
    'FFF5A9'
]

var stateResting = {
    scale: .7,
    opacity: 1
}

var stateHover = {
    scale: 1,
    opacity: 1
}

var howManySquares = 16;
var lengthOfSide = 50;

function drawSquares() {
    for (i = 0; i < howManySquares; i++) {
        var newCell = '<div class="cell" id="cell-' + i + '"></div>';
        $('#cells').append(newCell);
        var currentCell = $('#cell-' + i);
        setBackgroundColor(currentCell);
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
                    $(this).css({ transformOrigin: '50% 50%' });
                    $(this).transition(stateResting, 200, 'easeOutQuint' );
                }
            })

    $('.cell').toggle(
        function() {
            var xTransformOrigin = getXTransformOrigin($(this).index())  + 'px';
            var yTransformOrigin = ( lengthOfSide * parseInt($(this).index() / 4) / 3 ) + 'px';
            // var yTransformOrigin = parseInt($(this).index() / 4) * (-lengthOfSide) + 'px';
            $(this)
                .css({ transformOrigin: xTransformOrigin + ' ' + yTransformOrigin})
                .transition({scale: 4, opacity: 1}, 200, 'easeOutQuint' )  
                .css('z-index', '5');
            $(this).addClass('zoomed');
        },
        function() {
            $(this).transition(stateHover, 100, 'easeOutQuint' );
            $(this).removeClass('zoomed');
            // $(this).css({ transformOrigin: '50% 50%' })
        }
    )
}

function fadeIn(currentCell, i) {
    setTimeout(
        function() {
            currentCell
                .transition({scale: 0})
                .transition({opacity: 1, scale: 1}, 500, 'snap')
                .transition(stateResting, 250, 'snap');
        },
        8 * i
    )
}

function getXTransformOrigin(i) {
    i = i % 4;
    return (lengthOfSide * i ) / 3
}

function setBackgroundColor(currentCell) {
    cellColorId = Math.floor(Math.random() * cellColors.length);
    bgColorId = Math.floor(Math.random() * bgColors.length);
    currentCell.css('background-color', '#' + cellColors[cellColorId]);
    // $('body').css('background-color', '#' + bgColors[bgColorId]);
}