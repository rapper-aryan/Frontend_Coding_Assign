const tree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: "c1-c1 Hello" },
        { name: 'child1-child2', data: "c1-c2 JS" }
      ]
    },
    { name: 'child2', data: "c2 World" }
  ]
};

function createTagElement(tagData) {
  const tagElement = document.createElement('div');
  tagElement.className = 'tag';

  const tagNameHeader = document.createElement('div');
  tagNameHeader.className = 'tag-header';

  const arrowButton = document.createElement('button');
  arrowButton.textContent = '>';
  arrowButton.addEventListener('click', () => {
    if (arrowButton.textContent === '>') {
      arrowButton.textContent = 'v';
      childrenContainer.style.display = 'none';
    } else {
      arrowButton.textContent = '>';
      childrenContainer.style.display = 'block';
    }
  });

  tagNameHeader.appendChild(arrowButton);

  const tagName = document.createElement('span');
  tagName.textContent = tagData.name;
  tagName.addEventListener('click', () => {
    // ... Code for editing tag name ...
  });

  tagNameHeader.appendChild(tagName);

  tagElement.appendChild(tagNameHeader);

  if (tagData.data) {
    const dataInput = document.createElement('input');
    dataInput.type = 'text';
    dataInput.value = tagData.data;
    dataInput.addEventListener('input', () => {
      tagData.data = dataInput.value;
    });
    tagElement.appendChild(dataInput);
  }

  if (tagData.children) {
    const childrenContainer = document.createElement('div');
    childrenContainer.style.marginLeft = '20px';
    childrenContainer.style.display = 'block';

    tagData.children.forEach(childTag => {
      const childTagElement = createTagElement(childTag);
      childrenContainer.appendChild(childTagElement);
    });

    tagElement.appendChild(childrenContainer);

    const addChildButton = document.createElement('button');
    addChildButton.textContent = 'Add Child';
    addChildButton.addEventListener('click', () => {
      const newTag = { name: 'New Child', children: [] };
      tagData.children.push(newTag);
      const newTagElement = createTagElement(newTag);
      childrenContainer.appendChild(newTagElement);
    });
    tagElement.appendChild(addChildButton);
  }

  return tagElement;
}

const tagContainer = document.getElementById('tagContainer');
const exportButton = document.getElementById('exportButton');
const rootTag = createTagElement(tree);
tagContainer.appendChild(rootTag);

exportButton.addEventListener('click', () => {
  const exportedData = JSON.stringify(tree, (key, value) => {
    if (key === 'children' || key === 'data') {
      return value;
    }
    return undefined;
  }, 2);
  console.log(exportedData); // Display in console, you can adjust this as needed
});
