import { useState } from 'react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            onClick={() => toggleIndex(index)}
            className="w-full text-left py-4 px-3 flex justify-between items-center focus:outline-none"
          >
            <span className="font-medium text-white">{item.question}</span>
            <span className="text-xl text-white">{activeIndex === index ? '-' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="px-3 pb-4 text-white transition-all duration-300 ease-in-out text-start">
                {item.answer}
            </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
