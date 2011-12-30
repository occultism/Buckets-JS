describe('Linked List',
function() {

    var list;
    var elems = 100;

    beforeEach(function() {
        list = new buckets.LinkedList();
    });

    it('Inserts elements',
    function() {

        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
        expect(list.size()).toEqual(0);
        for (var i = 0; i < elems; i++) {
            list.add(i);
            expect(list.first()).toEqual(0);
            expect(list.last()).toEqual(i);

            if (i === 0) {
                expect(list.first()).toEqual(list.last());
            }
            expect(list.size()).toEqual(i + 1);
        }
    });

    it('Inserts an element to specified index',
    function() {

        expect(list.elementAtIndex( - 1)).toBeUndefined();
        expect(list.elementAtIndex(0)).toBeUndefined();
        expect(list.elementAtIndex(1)).toBeUndefined();


        for (var i = 0; i < elems; i++) {
            list.add(i);
            expect(list.elementAtIndex(list.size() - 1)).toEqual(i);
            expect(list.elementAtIndex(i)).toEqual(i);

            for (var j = 0; j < i; j++) {
                expect(list.elementAtIndex(j)).toEqual(j);
            }
        }
    });


    it('Doesnt add elements to invalid indexes',
    function() {

        expect(list.addElementAtIndex(0, 1)).toBeFalsy();
        expect(list.size() === 0).toBeTruthy();
        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
    });


    it('Inserts elements to the last index',
    function() {

        for (var i = 0; i < elems; i++) {
            expect(list.addElementAtIndex(i, i)).toBeTruthy();
            expect(list.elementAtIndex(i)).toEqual(i);
            expect(list.first()).toEqual(0);
            expect(list.last()).toEqual(i);
            if (i === 0) {
                expect(list.first()).toEqual(list.last());
            }
            expect(list.size()).toEqual(i + 1);
        }
    });

    it('Inserts elements at the first index',
    function() {

        for (var j = 0; j < elems; j++) {

            for (var i = 0; i < j; i++) {
                list.add(i);
            }
            list.addElementAtIndex( - i, 0);
            expect(list.elementAtIndex(0)).toEqual( - i);
            expect(list.first()).toEqual( - i);
        }
    });

    it('Inserts elements to custom index',
    function() {

        for (var j = 0; j < elems; j++) {
            list.add(j);
        }

        list.addElementAtIndex( - 100, elems / 2);
        expect(list.elementAtIndex(elems / 2)).toEqual( - 100);
    });


    it('Finds elements with indexOf',
    function() {
        expect(list.indexOf(0)).toEqual( - 1);
        for (var j = 0; j < elems; j++) {
            list.add(j + 1);
            expect(list.indexOf(j + 1)).toEqual(j);
            expect(list.indexOf( - 100)).toEqual( - 1);
        }
        for (var j = 0; j < elems; j++) {
            expect(list.indexOf(j + 1)).toEqual(j);
            expect(list.indexOf( - 100)).toEqual( - 1);
        }
    });

    it('Finds elements with indexOf and custom equals function',
    function() {

        function equals(a, b) {
            return a.el === b.el;
        };

        list = new buckets.LinkedList(equals);

        expect(list.indexOf({
            el: 1
        })).toEqual( - 1);
        for (var j = 0; j < elems; j++) {
            list.add({
                el: j + 1
            });
            expect(list.indexOf({
                el: j + 1
            })).toEqual(j);
            expect(list.indexOf({
                el: -200
            })).toEqual( - 1);
        }
        for (var j = 0; j < elems; j++) {
            expect(list.indexOf({
                el: j + 1
            })).toEqual(j);
            expect(list.indexOf({
                el: -200
            })).toEqual( - 1);
        }
    });

    it('Removes elements',
    function() {

        expect(list.remove(1)).toBeFalsy();
        expect(list.size() === 0).toBeTruthy();
        expect(list.last()).toBeUndefined();
        expect(list.first()).toBeUndefined();

        for (var i = 0; i < elems; i++) {
            list.add(i);
            expect(list.remove(i)).toBeTruthy();
            expect(list.size() === 0).toBeTruthy();
            expect(list.last()).toBeUndefined();
            expect(list.first()).toBeUndefined();
        }

        list.add(1);
        list.add(2);
        expect(list.remove(1)).toBeTruthy();
        expect(list.size() === 1).toBeTruthy();
        expect(list.first()).toEqual(2);
        expect(list.last()).toEqual(2);
        list.clear();

        for (var i = 0; i < elems; i++) {
            list.add(i);
        }

        var half = elems / 2;
        list.remove(elems / 2);
        for (var i = 0; i < elems; i++) {

            if (i === (half)) {
                expect(list.indexOf(i)).toEqual( - 1);
            }
            else if (i < half) {
                expect(list.indexOf(i)).toEqual(i);
            }
            else if (i > half) {
                expect(list.indexOf(i)).toEqual(i - 1);
            }
        }
        expect(list.size() === (elems - 1)).toBeTruthy();

    });

    it('Removes elements at specified index',
    function() {

        expect(list.removeElementAtIndex(0)).toBeUndefined();
        expect(list.removeElementAtIndex( - 1)).toBeUndefined();
        expect(list.removeElementAtIndex(1)).toBeUndefined();
        expect(list.size() === 0).toBeTruthy();


        list.add(1);

        expect(list.removeElementAtIndex( - 1)).toBeUndefined();
        expect(list.removeElementAtIndex(1)).toBeUndefined();
        expect(list.size() === 1).toBeTruthy();

        expect(list.removeElementAtIndex(0)).toEqual(1);
        expect(list.size() === 0).toBeTruthy();
        expect(list.first()).toBeUndefined();
        expect(list.last()).toBeUndefined();
        expect(list.elementAtIndex(0)).toBeUndefined();


        list.add(1);
        list.add(2);
        expect(list.removeElementAtIndex(0)).toEqual(1);
        expect(list.size() === 1).toBeTruthy();
        expect(list.first()).toEqual(2);

        list.clear();
        list.add(1);
        list.add(2);
        list.add(3);
        expect(list.removeElementAtIndex(2)).toEqual(3);
        expect(list.size() === 2).toBeTruthy();
        expect(list.first()).toEqual(1);
        expect(list.last()).toEqual(2);
        list.clear();

        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);

        expect(list.removeElementAtIndex(2)).toEqual(3);
        expect(list.size() === 4).toBeTruthy();
        expect(list.first()).toEqual(1);
        expect(list.last()).toEqual(5);

        expect(list.elementAtIndex(0)).toEqual(1);
        expect(list.elementAtIndex(1)).toEqual(2);
        expect(list.elementAtIndex(2)).toEqual(4);
        expect(list.elementAtIndex(3)).toEqual(5);
    });

    it('Converts the list to an array',
    function() {

        expect(list.toArray().length).toEqual(0);

        list.add(5);
        var arr = list.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr.length).toEqual(1);

        list.add(8);
        arr = list.toArray();
        expect(arr[0]).toEqual(5);
        expect(arr[1]).toEqual(8);
        expect(arr.length).toEqual(2);
    });

    it('The iterator works properly',
    function() {

        var it = list.iterator();
        expect(it.hasNext()).toBeFalsy();
        expect(it.next()).toBeUndefined();


        for (var i = 0; i < elems; i++) {
            list.add(i);
        }

        it = list.iterator();
        var i = 0;
        while (it.hasNext()) {
            expect(it.next()).toEqual(i);
            i++;
        }

        it = list.iterator();
        var i = 0;
        while (it.hasNext()) {
            it.next();
            it.replace(i + 1);
            i++;
        }
        var i = 0;
        while (it.hasNext()) {
            expect(it.next()).toEqual(i + 1);
            i++;
        }
    });

});