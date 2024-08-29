// Saves options to chrome.storage
const saveOptions = () => {
    const enabled = document.getElementById('enabled').checked;
    const currCount = parseInt(document.getElementById('counter').textContent);

    chrome.storage.sync.set(
        { extensionEnabled: enabled, rickRollCount: currCount },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            chrome.tabs.reload();
            setTimeout( () => {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        { extensionEnabled: true, rickRollCount: 1},
        (items) => {
            document.getElementById('enabled').checked = items.extensionEnabled;
            const counterElement = document.getElementById('counter');
            counterElement.textContent = items.rickRollCount;
        }
    );
};

const modifyCounter = (val) => {
    const counterElement = document.getElementById('counter');
    const currCount = parseInt(counterElement.textContent);
    counterElement.textContent = Math.max(currCount + val, 0);
}

const resetCounter = () => {
    const counterElement = document.getElementById('counter');
    counterElement.textContent = 1;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

document.getElementById('decrement').addEventListener('click', () => modifyCounter(-1));
document.getElementById('increment').addEventListener('click', () => modifyCounter(1));
document.getElementById('reset').addEventListener('click', resetCounter);