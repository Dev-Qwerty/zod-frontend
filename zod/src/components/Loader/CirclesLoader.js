import { useLoading, Circles } from '@agney/react-loading';
//import './Loader.css';

function CirclesLoader() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Circles width="100" color="#4CBF53"/>
  });

  return (
    <div className="circles-loader-animation">
    <section {...containerProps}>
      {indicatorEl} {/* renders only while loading */}
    </section>
    </div>
  );
}

export default CirclesLoader