import './stars.css';

export default function Stars({ count }) {
  const stars = [];
  for (let step = 0; step < count; step++) {
    stars.push(<div key={step} className="star"></div>);
  }

  return (
    <div className="stars">
      {stars}
    </div>
  );
}
