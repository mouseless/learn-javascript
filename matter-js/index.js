const { Engine, Render, Runner, Bodies, Composite, Composites, Mouse, MouseConstraint } = require("matter-js");

window.onload = function() {
  const engine = Engine.create({
      gravity: { x: 0, y: 0 }
  });
  const render = Render.create({
      canvas: document.getElementById("matter-js"),
      engine: engine,
      options: {
        wireframes: false,
        background: "transparent"
      }
  });

  const boxes = Composites.stack(200, 100, 10, 10, 0, 0, (x, y) => {
    return Bodies.circle(x, y, 20, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0
    });
  });

  const edges = [
      Bodies.rectangle(0, 0, 1600, 10, { isStatic: true }),
      Bodies.rectangle(0, 0, 10, 1200, { isStatic: true }),
      Bodies.rectangle(0, 1190, 1600, 1200, { isStatic: true }),
      Bodies.rectangle(1590, 0, 1600, 1200, { isStatic: true })
  ];

  Composite.add(engine.world, [boxes, ...edges]);

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      angularStiffness: 0,
      render: { visible: false }
    }
  });

  Composite.add(engine.world, mouseConstraint);

  render.mouse = mouse;
  Render.run(render);

  const runner = Runner.create();
  Runner.run(runner, engine);
}
