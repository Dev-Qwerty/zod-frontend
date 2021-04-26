import { useLoading, Oval } from '@agney/react-loading';
import './Loader.css';

function Loader() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="150" />
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