import React, { Component } from "react";
import d3 from "d3";


let pathForeground;
let arcLine;
let middleTextCount;
let arcDummy;
let endCircle;

class PieChart extends Component {
  constructor(props){
      super(props)
      this.state={
          oldValue:0
      }
  }

  componentDidMount() {
    var percent = this.props.percent;
    
    var pie = d3.layout
      .pie()
      .value(function(d) {
        return d;
      })
      .sort(null);
    var w = 200, h = 200;
    var outerRadius = w / 2 - 10;
    var innerRadius = outerRadius - 8;
    var color = ["#2196F3", "#2a3a46", "#202b33"];
    var arc = d3.svg
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    //The circle is following this
    arcDummy = d3.svg
      .arc()
      .innerRadius((outerRadius - innerRadius) / 2 + innerRadius)
      .outerRadius((outerRadius - innerRadius) / 2 + innerRadius)
      .startAngle(0);

    arcLine = d3.svg
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0);

    var svg = d3
      .select(this.refs.mountPoint)
      .attr("viewBox", "0 0 700 500")
      .append("svg")
      .attr({
        width: w,
        height: h,
        class: "shadow"
      })
      .append("g")
      .attr({
        transform: "translate(" + w / 2 + "," + h / 2 + ")"
      });

    //background
    var path = svg
      .append("path")
      .attr({
        d: arc
      })
      .style({
        fill: color[1]
      });

    pathForeground = svg
      .append("path")
      .datum({ endAngle: 0 })
      .attr({
        d: arcLine
      })
      .style({
        fill: color[0]
      });

    //Dummy Arc for Circle
    var pathDummy = svg
      .append("path")
      .datum({ endAngle: 0 })
      .attr({
        d: arcDummy
      })
      .style({
        fill: color[0]
      });

    endCircle = svg
      .append("circle")
      .attr({
        r: 12,
        transform: "translate(0," + (-outerRadius + 15) + ")"
      })
      .style({
        stroke: color[0],
        "stroke-width": 8,
        fill: color[2]
      });

    middleTextCount = svg
      .append("text")
      .datum(0)
      .text(function(d) {
        return d + "%";
      })
      .attr({
        class: "middleText",
        "text-anchor": "middle",
        dy: 18,
        dx: 0
      })
      .style({
        fill: "#2196F3",
        "font-size": "48px"
      });

      this.animate(percent);
  }

   arcTweenOld = (transition, percent, oldValue)=> {
      transition.attrTween("d", function(d) {
        var newAngle = percent / 100 * (2 * Math.PI);

        var interpolate = d3.interpolate(d.endAngle, newAngle);

        var interpolateCount = d3.interpolate(oldValue, percent);

        return function(t) {
          d.endAngle = interpolate(t);
          var pathForegroundCircle = arcLine(d);

          middleTextCount.text(Math.floor(interpolateCount(t)) + "%");

          var pathDummyCircle = arcDummy(d);
          
          if(pathDummyCircle.split("L")[1] !== undefined){
             var coordinate = pathDummyCircle.split("L")[1].split("A")[0];
             endCircle.attr("transform", "translate(" + coordinate + ")");
          }

          return pathForegroundCircle;
        };
      });
    };

   

    animate = (percent)=> {
      this.setState({oldValue : percent})

      pathForeground
        .transition()
        .duration(750)
        .ease("cubic")
        .call(this.arcTweenOld, percent, this.state.oldValue);

       
    };



  componentWillReceiveProps(nextProps) { 
      this.animate(nextProps.percent);
  }
  

  render() {
    return <div style={{display:'flex',alignItems:'center',justifyContent:'center'}} ref="mountPoint" />;
  }
}

export default PieChart;
