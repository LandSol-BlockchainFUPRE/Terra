import Accordion from './Accordian';

const faqData = [
  {
    question: 'What is TerraRegistry?',
    answer: 'You can return any item within 30 days of purchase.',
  },
  {
    question: 'How can I use TerraRegistry?',
    answer: 'Yes, we ship to most countries worldwide.',
  },
  {
    question: 'What is Government Regulations on TerraRegistry?',
    answer: 'You can reach us via email or our contact form.',
  },
];

const FAQ = () => {
  return (
    <section className="py-6 max-w-2xl mx-auto">
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Frequently Asked Questions</h2>
        <Accordion items={faqData} />
      </div>
    </section>
  );
};

export default FAQ;
