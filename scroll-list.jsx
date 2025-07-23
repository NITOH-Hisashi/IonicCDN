const totalItems = 10000;
const itemHeight = 40;
const visibleCount = 20;

const ScrollList = () => {
  const [startIndex, setStartIndex] = React.useState(0);

  // スクロール領域を制限し、表示アイテムを動的に切り替える
  React.useEffect(() => {
    const container = document.getElementById('scroll-container');
    container.addEventListener('scroll', () => {
      const scrollTop = container.scrollTop;
      const newStart = Math.floor(scrollTop / itemHeight);
      setStartIndex(newStart);
    });
  }, []);

  // 表示アイテム
  const items = [];
  for (let i = startIndex; i < startIndex + visibleCount; i++) {
    items.push(
      <ion-item key={i}>
        <ion-label>{`Item ${i}`}</ion-label>
      </ion-item>
    );
  }

  return <div style={{ height: totalItems * itemHeight + 'px' }}>{items}</div>;
};

ReactDOM.createRoot(document.getElementById('visible-items')).render(<ScrollList />);
