import './ModalWindow.css'
import React from "react";
import {cleanup} from "@testing-library/react";

export function showModal() {
    console.log("showModal called");
    document.getElementById('modalWindow')!.classList.remove("notShown");
    document.getElementById('modalWindow')!.classList.add('isShown');
    matrixStart()
}

export function closeModal() {
    console.log("closeModal called");
    document.getElementById('modalWindow')!.classList.remove("isShown");
    document.getElementById('modalWindow')!.classList.add('notShown');
    matrixStop();
}

export function innerModalClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //console.log("Inhalt des ModalWindow wurde geklickt, Modal wird nicht geschlossen.");
    event.stopPropagation();
}

function ModalWindow(
    /*innerWidth: number = 50,
    innerHeight: number = 50,
    topPos: number = 25,
    leftPos: number = 25*/
) {
    return (
        <div id="modalWindow" className="cinemaModal bgDarken notShown" onClick={closeModal}>
            <div
                className="innerModal bgBlack"
                style={
                    {   /*height: innerHeight + "%",
                        width: innerWidth% + "%",
                        top: topPos,
                        left: leftPos*/
                    }
                }
                onClick={
                    (event) => innerModalClick(event)
                }
            >
                <canvas width="100%" height="100%" id="canv"  />
                {/*<p>TODO</p>*/}
            </div>
        </div>
    );

}

function matrixStart() {
    // Get the canvas node and the drawing context
    const canvas = document.getElementById('canv');
    // @ts-ignore
    const ctx = canvas.getContext('2d');

    // set the width and height of the canvas
    // @ts-ignore
    const w = canvas.width = document.body.offsetWidth;
    // @ts-ignore
    const h = canvas.height = document.body.offsetHeight;

    // draw a black rectangle of width and height same as that of the canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    const cols = Math.floor(w / 20) + 1;
    const ypos = Array(cols).fill(0);

    function matrix () {
        // Draw a semitransparent black rectangle on top of previous drawing
        ctx.fillStyle = '#0001';
        ctx.fillRect(0, 0, w, h);

        // Set color to green and font to 15pt monospace in the drawing context
        ctx.fillStyle = '#0f0';
        ctx.font = '15pt monospace';

        // for each column put a random character at the end
        ypos.forEach((y, ind) => {
            // generate a random character
            const text = String.fromCharCode(Math.random() * 128);

            // x coordinate of the column, y coordinate is already given
            const x = ind * 20;
            // render the character at (x, y)
            ctx.fillText(text, x, y);

            // randomly reset the end of the column if it's at least 100px high
            if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
            // otherwise just move the y coordinate for the column 20px down,
            else ypos[ind] = y + 20;
        });
    }

    // render the animation at 20 FPS.
    let test = setInterval(matrix, 25);
}

function matrixStop() {
    clearInterval(8);
}

export default ModalWindow;