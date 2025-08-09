"use client";

import { useEffect, useRef } from "react";
import * as Matter from "matter-js";

type PhysicsObject = {
  label: string;
  bgColor: string;
};

export default function PhysicsObjectsSpace(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const physicsObjects: PhysicsObject[] = [
    { label: "JavaScript", bgColor: "bg-yellow-500" },
    { label: "TypeScript", bgColor: "bg-blue-500" },
    { label: "React", bgColor: "bg-cyan-500" },
    { label: "Next.js", bgColor: "bg-green-500" },
    { label: ".NET", bgColor: "bg-purple-500" },
    { label: "Python", bgColor: "bg-indigo-500" },
    { label: "PostgreSQL", bgColor: "bg-orange-500" },
    { label: "Express.js", bgColor: "bg-lime-500" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1) Engine + World
    const engine = Matter.Engine.create();
    const world = engine.world;
    engine.gravity.y = 1;

    const rect = container.getBoundingClientRect();

    // 2) Límites (paredes + suelo más alto)
    const thickness = 50;
    const floor = Matter.Bodies.rectangle(
      rect.width / 2,
      rect.height - thickness / 2, // justo al ras del borde inferior
      rect.width,
      thickness,
      { isStatic: true }
    );
    const left = Matter.Bodies.rectangle(
      -thickness / 2,
      rect.height / 2,
      thickness,
      rect.height,
      { isStatic: true }
    );
    const right = Matter.Bodies.rectangle(
      rect.width + thickness / 2,
      rect.height / 2,
      thickness,
      rect.height,
      { isStatic: true }
    );

    Matter.World.add(world, [floor, left, right]);

    // 3) Crear cuerpos para cada elemento .physics-object
    const elements = Array.from(container.querySelectorAll(".physics-object"));
    const width = 120;
    const height = 60;

    const bodies: { element: HTMLElement; body: Matter.Body }[] = [];

    elements.forEach((el, index) => {
      const element = el as HTMLElement;

      // Posición inicial aleatoria
      const x = Math.random() * (rect.width - width) + width / 2;
      const y = 60 + index * 40;

      const body = Matter.Bodies.rectangle(x, y, width, height, {
        restitution: 0.8,
        friction: 0.1,
        density: 0.002,
      });

      Matter.World.add(world, body);
      bodies.push({ element, body });

      // Alinear con el centro físico
      element.style.transform = `translate(-50%, -50%)`;
      element.style.left = "0px";
      element.style.top = "0px";
      element.style.cursor = "grab";
    });

    // 4) MouseConstraint para arrastrar
    const mouse = Matter.Mouse.create(container);
    mouse.pixelRatio = window.devicePixelRatio || 1;

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.1,
        render: { visible: false },
      },
    });

    Matter.World.add(world, mouseConstraint);

    Matter.Events.on(mouseConstraint, "startdrag", (evt) => {
      const target = bodies.find((b) => b.body === evt.body)?.element;
      if (target) target.style.cursor = "grabbing";
    });
    Matter.Events.on(mouseConstraint, "enddrag", (evt) => {
      const target = bodies.find((b) => b.body === evt.body)?.element;
      if (target) target.style.cursor = "grab";
    });

    // 5) Loop: motor + sincronización DOM
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      Matter.Engine.update(engine, delta);

      bodies.forEach(({ element, body }) => {
        element.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad) translate(-50%, -50%)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // 6) Limpieza
    return () => {
      cancelAnimationFrame(rafId);
      Matter.World.remove(world, mouseConstraint);
      mouseConstraint.mouse.element = null as any;
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <section className="relative w-screen h-svh bg-gray-100 overflow-hidden">
      <div ref={containerRef} className="relative w-full h-full">
        {physicsObjects.map((obj, index) => (
          <div
            key={index}
            className={`physics-object absolute text-black text-xl font-bold ${obj.bgColor} px-6 py-3 rounded-xl select-none`}
            style={{
              width: "120px",
              height: "60px",
              left: 0,
              top: 0,
              willChange: "transform",
            }}
          >
            {obj.label}
          </div>
        ))}
      </div>
    </section>
  );
}

