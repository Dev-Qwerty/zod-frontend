import { useLoading, BallTriangle } from '@agney/react-loading';
import './Loader.css';

function Loader() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <BallTriangle width="300" color="#4CBF53"/>
  });

  return (
    <div className="loader-animation">
    <section {...containerProps}>
      {indicatorEl} {/* renders only while loading */}
    </section>
    </div>
  );
}

export default Loader