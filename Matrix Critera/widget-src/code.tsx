// Imports
const { widget } = figma;
const { AutoLayout, Input, Text, Span, useSyncedState } = widget;

// Editable variables
const placeholderTexts = ["Enter your rating", "Enter your rating", "Enter your rating", "Enter your rating", "Total"];
const fontSize = 45;
const fontSizeTotal = 70;
const inputWidth = 500;
const shadow = {
        type: "drop-shadow",
        color: "#00000010",
        offset: {
          x: 0,
          y: 5,
        },
        blur: 40,
      };
const title = {fontSize:36, fontWeight:700}
const text =  {width:inputWidth, fontSize:30, lineHeight:40}
const layout = {spacing:40, padding:20}
const initialRows = ["0", "0", "0", "0", "0"]; // Initialized with default values

function TableWidget() {
  const [rows, setRows] = useSyncedState("rows", initialRows);

  const handleTextChange = (newText, index) => {
    let newRows = [...rows];
    // Parse the input as an integer and clamp the value between -5 and 5
    const parsedValue = Math.max(0, Math.min(100000, parseInt(newText) || 0));
    newRows[index] = parsedValue.toString();


    // Perform the custom calculation for the total score
    const score2 = parseInt(newRows[0]);
    const score3 = parseInt(newRows[1]);
    const score4 = parseInt(newRows[2]);
    const score5 = parseInt(newRows[3]);

    if (score5 !== 0) { // Prevent division by zero
      const total = Math.round((score2 * score3 * score4) / score5)
      newRows[4] = `${total}`;
    } else {
      newRows[4] = "";
    }

    // Update the state with the new rows
    setRows(newRows);
  };

  return (
    <AutoLayout direction='vertical' fill='#EAD8FF' cornerRadius={16} padding={50} effect={shadow}>
      <AutoLayout {...layout}>

        <Text {...text}>
          <Span {...title}>Reach</Span>{'\n'}{'\n'}
          How many PTs will be exposed to our change? {'\n'}
          Do PTs need to go through some steps before to see the change?{'\n'}{'\n'}
          Rate{'\n'}
          1 - 2 - 3 - 4 - 5{'\n'}
          Few to High Exposure
        </Text>

        <Text {...text}>
        <Span {...title}> Impact </Span>{'\n'}{'\n'}
          Do we bring value to PTs with this solution?{'\n'}
          Imagine how Design & Business goals could be impacted?{'\n'}{'\n'}
          Rate{'\n'}
          0 - 20 - 40 - 60 - 80 - 100{'\n'}
          No to Massive Impact
        </Text>

        <Text {...text}>
          <Span {...title}>Confidence</Span>{'\n'}{'\n'}
          What is the proof that our idea would resolve the problem?{'\n'}
          Do we have evidence that there is a real problem?{'\n'}{'\n'}
          Rate{'\n'}
          0 - 20 - 40 - 60 - 80 - 100{'\n'}
          Weak to Strong Confidence
        </Text>

        <Text {...text}>
          <Span {...title}>Effort</Span>{'\n'}{'\n'}
          How is the Technical effort?{'\n'}
          Do we need to produce Content?{'\n'}
          Will it cost money?{'\n'}{'\n'}{'\n'}
          Rate{'\n'}
          1 - 2 - 3 - 4 - 5{'\n'}
          Minimal to Heavy Effort.
        </Text>

        <Text {...text}>
          <Span {...title}> Total Score </Span>
        </Text>
      </AutoLayout>
      <AutoLayout {...layout}>
        {rows.map((text, index) => (
          <Input
            key={index}
            value={text}
            placeholder={placeholderTexts[index]}
            onTextEditEnd={(e) => handleTextChange(e.characters, index)}
            fontSize={index == 4 ? fontSizeTotal :fontSize}
            width= {inputWidth}
            height='fill-parent'
            inputFrameProps={{
              cornerRadius: 8,
              padding: 20,
              fill:'#ffffff',
              stroke:'#D4AFFE',
              strokeWidth:4,
            }}
            inputBehavior="multiline"
            disabled={index == 4} // Disable editing for the total row
          />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(TableWidget);
