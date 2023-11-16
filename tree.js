const tree = {
    value: 1,
    children: [
        {
            value: 2,
            children: [
                {
                    value: 4,
                    children: [],
                },
                {
                    value: 5,
                    children: [],
                },
            ],
        },
        {
            value: 3,
            children: [],
        },
    ],
};

// sum the tree values with recursion
const sumTreeRecursion = (tree) => {
    let sum = tree.value;

    tree.children.forEach((child) => {
        sum += sumTree(child);
    });

    return sum;
};

// console.log(sumTreeRecursion(tree));

// sum the tree values with a stack
const sumTreeStack = (tree) => {
    let sum = 0;
    const stack = [tree];

    while (stack.length) {
        const node = stack.pop();
        sum += node.value;

        node.children.forEach((child) => {
            stack.push(child);
        });
    }

    return sum;
};

// console.log(sumTreeStack(tree));

const binaryTree = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
            left: null,
            right: null,
        },
        right: {
            value: 5,
            left: null,
            right: null,
        },
    },
    right: {
        value: 3,
        left: null,
        right: null,
    },
};

// sum the binary tree values with recursion
const sumBinaryTreeRecursion = (tree) => {
    let sum = tree.value;

    if (tree.left) {
        sum += sumBinaryTree(tree.left);
    }

    if (tree.right) {
        sum += sumBinaryTree(tree.right);
    }

    return sum;
};

// console.log(sumBinaryTreeRecursion(binaryTree));

// sum the binary tree values with a stack
const sumBinaryTreeStack = (tree) => {
    let sum = 0;
    const stack = [tree];

    while (stack.length) {
        const node = stack.pop();
        sum += node.value;

        if (node.left) {
            stack.push(node.left);
        }

        if (node.right) {
            stack.push(node.right);
        }
    }

    return sum;
};
