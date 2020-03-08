import { useState, useEffect } from "react";

const useInterval = ({ data, delay }): [number, (x: number) => void] => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (data) {
            const lastProject = step === data.length - 1;

            if (lastProject) {
                const interval = setInterval(() => setStep(0), delay);
                return () => clearInterval(interval);
            }

            const interval = setInterval(() => setStep(step + 1), delay);
            return () => clearInterval(interval);
        }
    }, [step, data]);

    return [step, setStep];
};

export default useInterval;
