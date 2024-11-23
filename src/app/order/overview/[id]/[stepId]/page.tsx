"use client";
import { useParams } from "next/navigation";

export default function SelectedStep() {
    const { stepId } = useParams();

    return (
        <div>
            <h1>Step {stepId}</h1>
        </div>
    );
}