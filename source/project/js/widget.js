WIDGET_AUDIO = 'HTML5 Audio';
WIDGET_VIDEO = 'HTML5 Video';

function drawAWidget(type) {
    var feed = new Widget(type);
    _feeds_nodes.push(feed);
}

function Widget(type) {
    var beConnectedLine = 'undefined';
    var id = _feeds_nodes.length;
    var removeDot;

    var nextFeed = 'undefined';
    this.getNextFeed = function() {
        return nextFeed;
    }
    this.clearNextFeed = function() {
        nextFeed = 'undefined';
    }

    var service = new Service(type, TYPE_WIDGET);

    this.getService = function() {
        return service;
    };

    this.getBeConnectedLine = function() {
        return beConnectedLine;
    };

    this.setBeConnectedLine = function(line) {
        beConnectedLine = line;
    };

    this.getNode = function() {
        return feed;
    }

    this.setId = function(id) {
        id = id;
    }

    this.getId = function() {
        return id;
    }

    var feed = new Kinetic.Text({
            draggable: true,
            x: 0,
            y: 0,
            stroke: 'black',
            strokeWidth: 1,
            fill: '#ddf',
            text: type,
            fontSize: 10,
            fontFamily: 'Calibri',
            textFill: 'black',
            width: 350,
            padding: 10,
            align: 'center',
            // fontStyle: 'italic',
            shadow: {
                color: 'black',
                blur: 1,
                offset: [5, 5],
                opacity: 0.2
            },
            cornerRadius: 5
    });

    removeDot = new RemoveDot(this);

    feed.on('mouseover', function() {
        this.setStroke('red');
        _big_canvas_layer.draw();
    });
    feed.on('mouseout', function() {
        this.setStroke('black');
        _big_canvas_layer.draw();
    });

    // feed.on('click', function() {
    //     propertiesPanelShowRestFeed(service);
    // });

    feed.on("dragstart", function() {
        feed.moveToTop();
        removeDot.getRemoveDot().moveToTop();
        _big_canvas_layer.draw();
    });

    feed.on("dragmove", function() {
        moveRemoveDot(removeDot.getRemoveDot(), feed);

        if(beConnectedLine !== 'undefined') {
            beConnectedLine.setPoints(beConnectedLine.getPoints()[0].x, beConnectedLine.getPoints()[0].y,
                                        this.getX() + this.getBoxWidth()/2, this.getY() + this.getBoxHeight()/2); 
        }

        _big_canvas_layer.draw();
    });


    _big_canvas_layer.add(feed);
    _big_canvas_layer.add(removeDot.getRemoveDot());
    _big_canvas_stage.draw();
}


