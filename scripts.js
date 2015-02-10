var cellColors = [
    '00F9FF',
    '0CFF93',
    '81FF0D',
    '0CFF93',
    '0CFF93'
]

var stateResting = {
    scale: 1,
    opacity: 1
}

var stateHover = {
    scale: 1,
    opacity: 1
}

var howManySquares = 16;
var lengthOfSide = 100;

$(function() {
    $('#cells')
        .mouseenter(function() { showScreen( $(this).index() ); })
        .mouseleave(function() { hideScreen( $(this).index() ); })

    $('.ghost-cell')
        .mouseenter(function() { zoomIn( $(this).index() ); })
        .mouseleave(function() { zoomOut( $(this).index() ); })

    $('.cell').toggle(
        function() {
            zoomIn( $(this).index() );
        },
        function() {
            zoomOut( $(this).index() );
        }
    )
})

function drawSquares() {
    for (i = 0; i < howManySquares; i++) {
        var newCell = '<div class="cell" id="cell-' + i + '"><img src="images/' + i + '.gif"></div>';
        var ghostCell = '<div class="ghost-cell" id="ghost-cell-' + i + '"></div>';
        $('#ghost-cells').append(ghostCell);
        $('#cells').append(newCell);
        var currentCell = $('#cell-' + i);
        setBackgroundColor(currentCell);
        fadeIn(currentCell, i);
    }
}

function zoomIn(i) {
    cell = $('#cell-' + i);
    cell.addClass('zoomed');

    var index = cell.index();
    var xTransformOrigin = getXTransformOrigin(index)  + 'px';
    var yTransformOrigin =  getYTransformOrigin(index) + 'px';
    
    cell
        .css({ transformOrigin: xTransformOrigin + ' ' + yTransformOrigin})
        .css('-webkit-transform', 'scale(4,4)')
        .css('transform', 'scale(4,4)')
        .css('z-index', '1');
}

function zoomOut(i) {
    cell = $('#cell-' + i);
    cell.removeClass('zoomed');
    cell.css('z-index', '0')
        .css('-webkit-transform', 'scale(1,1)')
        .css('transform', 'scale(1,1)');
}

function fadeIn(currentCell, i) {
    setTimeout(
        function() {
            currentCell
                .transition({scale: 0})
                .transition({opacity: 1.5, scale: 1}, 500, 'snap')
                .transition(stateResting, 250, 'snap');
        },
        8 * i
    )
}

function showScreen() {
    $('#screen').transition({opacity: .8}, 200, 'easeOutQuint' );
}

function hideScreen() {
    $('#screen').transition({opacity: 0}, 200, 'easeOutQuint' );
}

function getXTransformOrigin(i) {
    i = i - 1;
    i = i % 4;
    return (lengthOfSide * i ) / 3
}

function getYTransformOrigin(i) {
    i = i - 1;
    return lengthOfSide * parseInt(i / 4) / 3;
}

function setBackgroundColor(currentCell) {
    cellColorId = Math.floor(Math.random() * cellColors.length);
    currentCell.css('background-color', '#' + cellColors[cellColorId]);
}