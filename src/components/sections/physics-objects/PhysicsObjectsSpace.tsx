/**
 ** PhysicsObjectsScroll.tsx
 * 
 * *Componente que muestra objetos con física utilizando Matter.js y GSAP.
 * *Los objetos pueden ser arrastrados y rebotan dentro de un contenedor.
 * 
 * *Requiere las dependencias: matter-js, gsap
 * TODO: Completar la funcionalidad de física y arrastre.
 * *Autor: HumanDev
 * *Fecha: 2024-06-27
 */

"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Matter from "matter-js";

type PhysicsObject = {
    label: string;
    bgColor: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function PhysicsObjectsSpace(): React.JSX.Element {

    const physicsObjects: PhysicsObject[] = [
        { label: "JavaScript", bgColor: "bg-yellow-500" },
        { label: "TypeScript", bgColor: "bg-blue-500" },
        { label: "React", bgColor: "bg-blue-500" },
        { label: "Next.js", bgColor: "bg-green-500" },
        { label: ".NET", bgColor: "bg-purple-500" },
        { label: "Python", bgColor: "bg-blue-500" },
        { label: "PostgreSQL", bgColor: "bg-orange-500" },
        { label: "Express.js", bgColor: "bg-green-500" },
    ];

    //* Configuración de física Matter.js 
    const config = {
        gravity: { x: 0, y: 1, scale: 1 }, //* Gravedad hacia abajo
        restitution: 0.5, //* Rebote
        friction: 0.15, //* Fricción
        frictionAir: 0.02, //* Fricción del aire
        density: 0.002, //* Densidad
        wallThickness: 200, //* Grosor de las paredes
        mouseStiffness: 0.6, //* Rigidez del mouse
    };

    //* Variables de Matter.js
    let engine: Matter.Engine; //* Motor de física
    let runner: Matter.Runner; //* Corredor de física
    let mouseConstraint: Matter.MouseConstraint; //* Restricción del mouse
    let bodies: any[] = []; //* Cuerpos físicos
    let topWall: Matter.Body | null = null; //* Pared superior


    //* Función para limitar el espacio y no salir de los bordes
    function clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    const containerRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container: HTMLDivElement | null = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();

        //* Inicia motor gráfico
        engine = Matter.Engine.create();
        engine.gravity = config.gravity;
        engine.timing.timeScale = 1;

        //* Paredes físicas estáticas: piso y laterales
        const wallThickness: number = config.wallThickness;
        const walls : Matter.Body[] = [
            //* Piso
            Matter.Bodies.rectangle(
                containerRect.width / 2,
                containerRect.height + wallThickness / 2,
                containerRect.width,
                wallThickness,
                { isStatic: true }
            ),
            //* Pared izquierda
            Matter.Bodies.rectangle(
                -wallThickness / 2,
                containerRect.height / 2,
                wallThickness,
                containerRect.height,
                { isStatic: true }
            ),
            //* Pared derecha
            Matter.Bodies.rectangle(
                containerRect.width + wallThickness / 2,
                containerRect.height / 2,
                wallThickness,
                containerRect.height,
                { isStatic: true }
            )
        ];

        Matter.World.add(engine.world, walls);

        //* Seleccionamos los elementos HTML y creamos cuerpos físicos para cada uno
        const objects = container.querySelectorAll('.physics-object');
        objects.forEach((obj: Element, index: number) => {
            const objRect = obj.getBoundingClientRect();

            const startX: number = Math.random() * (containerRect.width - objRect.width) + objRect.width / 2; //* Posición X aleatoria dentro del contenedor
            const startY: number = -500 - index * 200; //* Posición Y inicial fuera de la vista, escalonada por índice
            const startRotation: number = (Math.random() - 0.5) * Math.PI; //* Rotación inicial aleatoria

            const body = Matter.Bodies.rectangle(
                startX,
                startY,
                objRect.width,
                objRect.height,
                {
                    restitution: config.restitution,
                    friction: config.friction,
                    frictionAir: config.frictionAir,
                    density: config.density,
                }
            );

            //* Establecer la rotación inicial del cuerpo
            Matter.Body.setAngle(body, startRotation);
            bodies.push({
                body,
                element: obj,
                width: objRect.width,
                height: objRect.height,
            });

            //* Agregar el cuerpo al mundo
            Matter.World.add(engine.world, body);
        });

        //* Se crea el mouse para arrastrar los objetos
        const mouse = Matter.Mouse.create(container);
        mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: config.mouseStiffness,
                render: { visible: false },
            },
        });
        //* Agregar la restricción del mouse al mundo
        Matter.World.add(engine.world, mouseConstraint);         

        //* Actualizar posiciones de los objetos físicos en el DOM
        const updatePositions = () => {
            bodies.forEach(({ body, element, width, height }) => {
                const x = clamp(
                    body.position.x - width / 2,
                    0,
                    containerRect.width - width
                );

                const y = clamp(
                    body.position.y - height / 2,
                    -height,
                    containerRect.height - height
                );

                (element as HTMLElement).style.left = `${x}px`;
                (element as HTMLElement).style.top = `${y}px`;
                (element as HTMLElement).style.transform = `rotate(${body.angle}rad)`;
            });
        };
        
        runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);
        requestAnimationFrame(updatePositions); // Ejecutar bucle

    }, []);

    return (
        <section className="relative w-[100vw] h-[100svh] overflow-hidden p-8">
            <div className="absolute top-0 left-0 w-full h-full ">
                {physicsObjects.map((object: PhysicsObject, index: number) => (
                    <div key={index} className={`physics-object absolute max-w-max text-[2rem] font-medium ${object.bgColor} text-black p-4 border rounded-[50px] cursor-grab select-none pointer-events-auto z-20`}>
                        <p>{object.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}