//递归中的递阶段
import { FiberNode } from './fiber';
import { HostComponent, HostRoot, HostText } from './workTags';
import { processUpdateQueue, UpdateQueue } from './updateQueue';

export const beginWork = (wip: FiberNode) => {
	//比较，返回子fiberNode
	switch (wip.tag) {
		case HostRoot:
			return updateHostRoot(wip);
		case HostComponent:
			return;
		case HostText:
			return;
		default:
			if (__DEV__) {
				console.warn('beginWork未实现的类型');
			}
			break;
	}
};

function updateHostRoot(wip: FiberNode) {
	const baseState = wip.memoizedState;
	const updateQueue = wip.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	const { memoizedState } = processUpdateQueue(baseState, pending);
	wip.memoizedState = memoizedState;

	const nextChildren = wip.memoizedState;
	reconcilerChildren(wip, nextChildren);
	return wip.child;
}
