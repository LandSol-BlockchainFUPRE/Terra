import Accordion from './Accordian';

const faqData = [
  {
    question: 'What is your return policy?',
    answer: 'You can return any item within 30 days of purchase.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to most countries worldwide.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can reach us via email or our contact form.',
  },
];

const FAQ = () => {
  return (
    <section className="py-6 glass">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Frequently Asked Questions</h2>
        <Accordion items={faqData} />
      </div>
    </section>
  );
};

export default FAQ;
