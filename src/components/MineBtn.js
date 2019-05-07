const MineBtn = props => {
  return (
    <div>
      <Button
        variant="outline-info"
        size="lg"
        onClick={() => props.scoreClick()}
      >
        Mine Ore!
      </Button>
    </div>
  );
};
export default MineBtn;
