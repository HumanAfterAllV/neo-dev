/**
 * 
 * 
 * 
 * 
 */


"use client";

import { useEffect, useRef } from "react"
import * as Matter from "matter-js";
import AnimatedCopy from "@/components/elements/AnimatedCopy";

type PhysicsObject = {
    label: string;
    bgColor: string;
    textColor: string;
}

export default function PhysicsObjects(): React.JSX.Element {

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        //* Engine + World
        const engine = Matter.Engine.create({ enableSleeping: true });
        const world = engine.world;

        engine.gravity.y = 1;
        engine.positionIterations = 10;   //* default 6
        engine.velocityIterations = 10;   //* default 6
        engine.constraintIterations = 4;  //* default 2
        (engine as any).enableSleeping = true; //* activar "sleep" de cuerpos
        
        let rect = container.getBoundingClientRect();
        
        //* Límites (paredes + suelo más alto)
        const thickness: number = 140;
        const over = 2 * thickness; //* sobre-largo

        /* let floor: Matter.Body;
        let left: Matter.Body;
        let right: Matter.Body;
        let ceiling: Matter.Body;
         */
        const floor = Matter.Bodies.rectangle(
            rect.width / 2,
            rect.height - thickness / 2, //* justo al ras del borde inferior
            rect.width + over,
            thickness,
            { isStatic: true }
        );
        const left = Matter.Bodies.rectangle( //* pared izquierda
            -thickness / 2,
            rect.height / 2,
            thickness,
            rect.height + over,
            { isStatic: true }
        );
        const right = Matter.Bodies.rectangle( //* pared derecha
            rect.width + thickness / 2,
            rect.height / 2,
            thickness,
            rect.height + over,
            { isStatic: true }
        );
        const ceiling = Matter.Bodies.rectangle(
            rect.width / 2,
            -thickness / 2,
            rect.width + over,
            thickness,
            { isStatic: true }
        );

        //* Añadimos al mundo las tres paredes
        Matter.World.add(world, [floor, left, right, ceiling]);
        

        //* Crea los cuerpos para cada elemento
        const elements = Array.from(container.querySelectorAll(".physics-object"));
        const baseW: number = 105; //* Tamaño de los objetos
        const baseH: number = 105; //* Tamaño de los objetos
        
        const bodies: { element: HTMLElement; body: Matter.Body }[] = [];
        
        elements.forEach((el: Element, index: number) => {
            const element: HTMLElement = el as HTMLElement;
    
            //* Posición inicial aleatoria

            const w = baseW; // 90% - 120%
            const h = baseH;
            const x: number = Math.random() * (rect.width - w) + w / 2;
            const y: number = 60 + index * 40;
            

            //* Les damos densidad y tamaño a los elementos
            const body = Matter.Bodies.rectangle(x, y, w, h, {
                restitution: 0.5,
                friction: 0.15,
                density: 0.002 + Math.random() * 0.001,
                frictionAir: 0.002,
                chamfer: {radius: 6},
                sleepThreshold: 60,
            });
            

            // Arranque más “vivo”    
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
            Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: 0 });

            Matter.World.add(world, body);
            bodies.push({ element, body });
    
            //* Alinear con el centro físico
            element.style.transform = `translate(-50%, -50%)`;
            element.style.left = "0px";
            element.style.top = "0px";
            element.style.cursor = "grab";
        });

        //* MouseConstraint para arrastrar objetos con el mouse
        const mouse = Matter.Mouse.create(container);
        mouse.pixelRatio = window.devicePixelRatio || 1;

        //* Lo creamos dentro del World
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                damping: 0.12,
                render: { visible: false }
            },
        });

        Matter.World.add(world, mouseConstraint);
        
        Matter.Events.on(mouseConstraint, "startdrag", () => {
            container.style.cursor = "grabbing";
        });
        Matter.Events.on(mouseConstraint, "enddrag", () => {
            container.style.cursor = "grab";
            // si no hay drag, vuelve a default tras un frame (mejor UX)
            requestAnimationFrame(() => (container.style.cursor = "default"));
        });

        //* Anti-fugas extra: cap de velocidad ---
        const MAX_VEL: number = 25;
        const afterUpdate = () => {
            for (const { body } of bodies) {
                const { x, y } = body.velocity;
                const speed: number = Math.hypot(x, y);
                if (speed > MAX_VEL) {
                    const f = MAX_VEL / speed;
                    Matter.Body.setVelocity(body, { x: x * f, y: y * f });
                }
            }
        };

        Matter.Events.on(engine, "afterUpdate", afterUpdate);
        
        //* Loop: motor + sincronización DOM
        let rafId = 0;
        let acc = 0; 
        let last = performance.now();
        const FIXED = 1000 / 60;    // 60 FPS
        const MAX_FRAME = 1000 / 30; // clamp 33ms
        
        const tick = (now: number) => {
            let dt = now - last;
            last = now;

            dt = Math.min(dt, MAX_FRAME);
            acc += dt;

            while (acc >= FIXED) {
                Matter.Engine.update(engine, FIXED);
                acc -= FIXED;
            }

            for (const { element, body } of bodies) {
                element.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad) translate(-50%, -50%)`;
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        // --- 7) Resize: recolocar paredes (sobredimensionadas, no hay que recrearlas) ---
        const onResize = () => {
            rect = container.getBoundingClientRect();
            Matter.Body.setPosition(floor, { x: rect.width / 2, y: rect.height - thickness / 2 });
            Matter.Body.setPosition(left, { x: -thickness / 2, y: rect.height / 2 });
            Matter.Body.setPosition(right, { x: rect.width + thickness / 2, y: rect.height / 2 });
            Matter.Body.setPosition(ceiling, { x: rect.width / 2, y: -thickness / 2 });
        };
        
        window.addEventListener("resize", onResize, { passive: true });

        // --- 8) Limpieza ---
        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(rafId);

            Matter.Events.off(engine, "afterUpdate", afterUpdate);
            Matter.World.remove(world, mouseConstraint);
            (mouseConstraint.mouse as any).element = null;

            Matter.World.clear(world, false);
            Matter.Engine.clear(engine);
        };
    },[])

    const physicsObjects: PhysicsObject[] = [
        { label: "JavaScript", bgColor: "bg-yellow-500" , textColor: "text-black"},
        { label: "TypeScript", bgColor: "bg-purple-500" , textColor: "text-black"},
        { label: "React", bgColor: "bg-yellow-500" , textColor: "text-black"},
        { label: "Next.js", bgColor: "bg-purple-500" , textColor: "text-black"},
        { label: ".NET", bgColor: "bg-yellow-500" , textColor: "text-black"},
        { label: "Python", bgColor: "bg-purple-500" , textColor: "text-black"},
        { label: "PostgreSQL", bgColor: "bg-yellow-500" , textColor: "text-black"},
        { label: "Express.js", bgColor: "bg-purple-500" , textColor: "text-black"},
        { label: "SQL", bgColor: "bg-yellow-500" , textColor: "text-black"},
        { label: "GSAP", bgColor: "bg-purple-500" , textColor: "text-black"},
        { label: "Tailwind", bgColor: "bg-yellow-500" , textColor: "text-black"}

    ];

    return(
        <section className="relative w-full h-full rounded-3xl">
            <div className="absolute left-0 bottom-0  font-grotesk font-normal text-center">
                <AnimatedCopy tag="h1" className="lg:text-[8vw] sm:text-[10vw] text-black">
                    2025
                </AnimatedCopy>
            </div>
            <div className="absolute left-1/2 top-1/ -translate-x-1/2 font-grotesk font-black text-center">
            </div>
            <div ref={containerRef} className="relative w-full h-full">
                {physicsObjects.map((item: PhysicsObject, index: number) => (
                    <div 
                        key={index} 
                        className={`physics-object absolute ${item.textColor} text-xl font-barlow uppercase font-semibold ${item.bgColor} px-6 py-6 rounded-4xl select-none flex text-center justify-center items-center`}
                        style={{
                            width: "100px",
                            height: "100px",
                            left: 0,
                            top: 0,
                            willChange: "transform",
                            userSelect: "none"
                        }}
                    >
                        {item.label}
                    </div>
                ))}
                
            </div>
        </section>
    )
}