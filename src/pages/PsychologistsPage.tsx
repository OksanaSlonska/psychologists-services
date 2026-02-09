import { useEffect, useState } from "react";
import { getAllPsychologists } from "../services/psychologistsService";
import type { Psychologist } from "../types/psychologist";
import { PsychologistCard } from "../components/PsychologistCard/PsychologistCard";

export default function PsychologistsPage() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Просто вызываем функцию, как вы делали с axios
        const data = await getAllPsychologists();
        setPsychologists(data);
      } catch (error) {
        console.log("Ошибка загрузки");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  // 4. Верстка
  return (
    <div className="container">
      <div>
        {psychologists.map((person, index) => (
          <PsychologistCard key={index} data={person} />
        ))}
      </div>
    </div>
  );
}
