const WEB_SQL_DATABASE = 'html5_mashup_platform_web_database';
const DB_VERSION = '1.0';
const DB_TITLE = 'SQL database';
const DB_BYTES = 2 * 1024 * 1024;

const INDEXEDDB_DATABASE = 'html5_mashup_platform_web_database';
const INDEXEDDB_VERSION = '1.0';
const INDEXEDDB_STORE = 'projects';

const SHOW_PROJECTS = 'showProject';

const FEED_TYPE_REST = 'rest';
const FEED_TYPE_SOAP = 'soap';

var _database, idb;

var feeds_html = '';
var feeds_name_list = '';

var _current_container_id;
var _currentPlace = undefined;

function initialise() {
    readyDatabase();
    updateFeedsHTML();
    readProjects('options_field_output');
}

function visibleElement(elementId) {
    document.getElementById(elementId).style.visibility = 'visible';
}

function invisibleElement(elementId) {
    document.getElementById(elementId).style.visibility = 'hidden';
}

function resetCurrentPlace() {
    _currentPlace = undefined;
}

function showFeedsPanel(containerId) {
    _current_container_id = containerId;
    document.getElementById(containerId).innerHTML = '<table class="panel_table"><tr><td><table><tr><td><div>Feeds</div></td><td><div class="div_push_button" onclick="showAddFeedForm(\'dashboard_output\')">Add feed...</div></td></tr></table></td>' + 
    '</tr></table><hr class="seperator_hr"/>' + feeds_html;
}

function showWidgetsPanel(containerId) {
    _current_container_id = containerId;
    $('#'+ containerId).html('<div>Widgets</div><hr class="seperator_hr" /><table class="panel_table" style="margin-left:20px;width: 93%;"><tr><td nowrap=\'nowrap\' width=\"100%\"><div class="feed_panel_item" onclick="drawAWidget(\'' + WIDGET_AUDIO + '\');">HTML5 Audio</div></td></tr><tr><td nowrap=\'nowrap\' width=\"100%\"><div class="feed_panel_item" onclick="drawAWidget(\'' + WIDGET_VIDEO + '\');">HTML5 Video</div></td></tr></table>');
}


function showExecuteInputForm() {
    visibleElement('serviceBoard');
    visibleElement('serviceBoard_div');
    $('#serviceBoard_output').html('<form id="execute_form"><table class="frame_table" cellpadding="5px"><tr><td><label>Data set:</label><br/><input type="TEXT" id="execute_data_input" class="input_box" placeholder="Parameters..." form="execute_form"></td></tr><tr><td><div class="div_push_button" onclick="var executeData=$(\'#execute_data_input\').val(); startIterate(executeData);">Run</div><div class="div_push_button" onclick="closeServiceBoard()">Close</div></td></tr><tr><td><output id="execute_output"></output></td></tr></table></form>');
}

function closeServiceBoard() {
    invisibleElement('serviceBoard');
    invisibleElement('serviceBoard_div');
}

function showAddFeedForm(containerId) {
    visibleElement('dashboard');
    visibleElement('dashboard_div');
    document.getElementById(containerId).innerHTML = '<form id="the_form"><table class="frame_table" cellpadding="5px"><tr><td><label>Name: </label><br /><input type="TEXT" id="add_feed_form_feed_name" class="input_box" placeholder="Feed name" required="required" form="the_form"/></td></tr><tr><td><label>Feed URL: </label><br /><input type="TEXT" id="add_feed_form_feed_url" class="input_box" placeholder="Feed URL" required="required" form="the_form"/></td></tr><tr><td><label>Type: </label><br /><input type="RADIO" id="add_feed_form_feed_type_rest" name="type" style="margin-left: 50px;" value="REST/HTTP" checked="true"/><label for="add_feed_form_feed_type_rest">REST/HTTP</label><br /><input type="RADIO" id="add_feed_form_feed_type_soap" name="type" style="margin-left: 50px;" value="SOAP" /><label for="add_feed_form_feed_type_soap">SOAP</label></td></tr><tr><td><div class="div_push_button" onclick="addFeedFromFeedForm(\''+ containerId + '\')">OK</div><div class="div_push_button" onclick="closeAddNewFeed(\'' + containerId + '\')">Cancel</div></td></tr></table></form>';
}

function addFeedFromFeedForm(containerId) {
    var url = document.getElementById('add_feed_form_feed_url').value;
    var name = document.getElementById('add_feed_form_feed_name').value;
    var type_rest = document.getElementById('add_feed_form_feed_type_rest');
    var type_soap = document.getElementById('add_feed_form_feed_type_soap');
    var type;

    if(url.length == 0) {
        alert('Feed URL cannot be empty.');
        return;
    }
    if(name.length == 0) {
        alert('Feed name cannot be empty.');
        return;
    }

    if(feeds_name_list.indexOf(name) != -1) {
        alert('Feed name already in use, please choose another one.');
        return;
    }

    if(type_rest.checked) {
        type = FEED_TYPE_REST;
    }
    else if(type_soap.checked) {
        type = FEED_TYPE_SOAP;
    }

    // insert into database
    _database.transaction(function(tx) {
        tx.executeSql('INSERT INTO feeds (name, url, feed_type) VALUES (\"' + name + '\", \"' + url +'\", \"' + type + '\")');

        document.getElementById('add_feed_form_feed_url').value = document.getElementById('add_feed_form_feed_name').value = '';
        showNotificationInDashboard('Feed "' + name + '" has been added.');
    });
}

function closeAddNewFeed(containerId) {
    invisibleElement('dashboard_div');
    invisibleElement('dashboard');
    showFeedsPanel(_current_container_id);
}

function clearFeedsNameList() {
    feeds_name_list = "";
}

function appendFeedsNameList(name) {
    feeds_name_list += name + '\n';
}

function updateFeedsHTML() {
    _database.transaction(function(tx) {
        clearFeedsNameList();
        feeds_html = '<table class="panel_table">';
        tx.executeSql('SELECT name, url, feed_type FROM feeds', [], function(tx, results) {
            for(var index = 0; index != results.rows.length; ++index) {
                var row = results.rows.item(index);
                var name = row['name'];
                var url = row['url'];
                var type = row['feed_type'];
                feeds_html += '<tr><td><table cellpadding="0px" cellsapcing="0px"><tr><td><div id="feed_panel_item_table" class="feed_delelte_img" onclick="removeFeedFromFeedList(\'' + name + '\')" width="15px" height="15px">&nbsp;&nbsp;&nbsp;&nbsp;</div></center></td><td nowrap="nowrap" width="100%"><div class="feed_panel_item" onclick="drawARestFeed(\'' + name + '\', \'' + url + '\')"><span class="feed_panel_item_type"><strong>' + type + "</strong></span>" + name + '</div></td></tr></table></td></tr>';
                appendFeedsNameList(name);
            }
        }, null);
        feeds_html += '</table>'; 
    });
}

function showSaveProjectDialog() {
    visibleElement('dashboard');
    visibleElement('dashboard_div');
    $('#dashboard_output').html('<table class="frame_table"><tr><td>Save as:</td></tr><tr><td><input width="100%" type="TEXT" id="save_project_name_input" class="input_box" placeholder="Please give a name to your project..."/></td></tr><tr><td><div class="div_push_button" onclick="saveAProjectFromDialog();invisibleElement(\'dashboard\');invisibleElement(\'dashboard_div\');">Save</div><div class="div_push_button" onclick="invisibleElement(\'dashboard\');invisibleElement(\'dashboard_div\');">Cancel</div></td></tr></table>');
}

function showRemoveProjectDialog(md5, name) {
    visibleElement('dashboard');
    visibleElement('dashboard_div');
    $('#dashboard_output').html('<table class="frame_table"><tr><td><div>Are you sure you want to remove \"' + name + '\"?</div></td></tr><tr><td><div class="div_push_button" onclick="removeAProject(\'' + md5 + '\');invisibleElement(\'dashboard\');invisibleElement(\'dashboard_div\');">Yes</div><div class="div_push_button" onclick="invisibleElement(\'dashboard\');invisibleElement(\'dashboard_div\');">No</div></td></tr></table>');
}

function showMessageDialog(msg) {
    // show message
    visibleElement('dashboard');
    visibleElement('dashboard_div');
    document.getElementById('dashboard_output').innerHTML = '<table class="frame_table"><tr><td>' + msg +'</td></tr><tr><td><div class="div_push_button" onclick="invisibleElement(\'dashboard_div\');invisibleElement(\'dashboard\');">OK</div></td></tr></table>'
    ;
}

function showNotificationInDashboard(msg) {
    // show message
    visibleElement('dashboard');
    visibleElement('dashboard_div');
    document.getElementById('dashboard_output').innerHTML = '<table class="frame_table"><tr><td>' + msg +'</td></tr><tr><td><div class="div_push_button" onmouseover="if(_currentPlace != SHOW_PROJECTS) {updateFeedsHTML();}" onclick="if(_currentPlace == SHOW_PROJECTS){readProjects(\'options_field_output\');} else{showFeedsPanel(_current_container_id);}invisibleElement(\'dashboard_div\');invisibleElement(\'dashboard\');">OK</div></td></tr></table>'
    ;
}

function removeFeedFromFeedList(name) {
    removeFeedFromDatabase(name);
    showNotificationInDashboard('Feed "' + name + '" has been removed.');

//     updateFeedsHTML();
//     showFeedsPanel(_current_container_id);
}

function removeFeedFromDatabase(name) {
    _database.transaction(function(tx) {
        tx.executeSql('DELETE FROM feeds WHERE name="' + name + '"');
    });
}

function readyDatabase() {
    _database = openDatabase(WEB_SQL_DATABASE, DB_VERSION, DB_TITLE, DB_BYTES);
    // check & create table
    _database.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS feeds (name, url, feed_type)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS projects (md5 NOT NULL PRIMARY KEY, name, json)');
        // tx.executeSql('DROP TABLE projects');
    }
    );
// 
//     // now, initialise Indexed DB
//     // In the following line, you should include the prefixes of implementations you want to test.
//     window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//     // DON'T use "var indexedDB = ..." if you're not in a function.
//     // Moreover, you may need references to some window.IDB* objects:
//     window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
//     window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
//     // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
//     if (!window.indexedDB) {
//        window.alert("Your browser doesn't support a stable version of IndexedDB. Load and Save features will not be available.");
//        return;
//     }
// 
//     var request = indexedDB.open(INDEXEDDB_DATABASE, INDEXEDDB_VERSION);
//     request.onsuccess = function(evt) {
//         idb = request.result;
//         readProjects('options_field_output');
//     };
// 
//     request.onerror = function(evt) {
//         console.log("IndexedDB error: " + evt.target.errorCode);
//     };
// 
//     request.onupgradeneeded = function(evt) {
//         var objectStore = evt.currentTarget.result.createObjectStore(INDEXEDDB_STORE, {keyPath: "id", autoIncrement:true});
//         objectStore.createIndex("name", "name", {unique: false});
//         objectStore.createIndex("json", "json", {unique: false});
//     };
}

function readProjects(containerId) {
    _currentPlace = SHOW_PROJECTS;
    _database.transaction(function(tx) {
    var html = '<div>Existing projects</div><hr class="seperator_hr" /><table class="panel_table">';
        tx.executeSql('SELECT md5, name, json FROM projects', [], function(tx, results) {
            for(var index = 0; index != results.rows.length; ++index) {
                var row = results.rows.item(index);
                var md5 = row['md5'];
                var name = row['name'];
                html += '<tr><td><table cellpadding="0px" cellsapcing="0px" style="width:100%;"><tr><td><center><div id="feed_panel_item_table" class="feed_delelte_img" onclick="showRemoveProjectDialog(\'' + md5 + '\', \'' + name + '\');" width="15px" height="15px">&nbsp;&nbsp;&nbsp;&nbsp;</div></center></td><td nowrap="nowrap" width="100%"><div class="feed_panel_item" onclick="readAProject(\'' + md5 + '\')">' + name + '</div></td></tr></table></td></tr>';
            }
            html += '</table>';
            $('#' + containerId).html(html);
        }, null);
    });

// 
//     var objectStore = idb.transaction(INDEXEDDB_STORE, IDBTransaction.READ_ONLY).objectStore(INDEXEDDB_STORE);
//     objectStore.openCursor().onsuccess = function(evt) {
//         var cursor = evt.target.result;
//         if(cursor) {
//             var id = cursor.key;
//             var name = cursor.value.name;
//             cursor.continue();
//         }
//     };
}

function readAProject(md5) {
    _database.transaction(function(tx) {
        tx.executeSql('SELECT json FROM projects WHERE md5="' + md5 + '"', [], function(tx, results) {
            var json = '';
            for(var index = 0; index != results.rows.length; ++index) {
                var row = results.rows.item(index);
                json = row['json'];
            }
            loadFromJSON(json);            
        }, null);
    });

    // var getRequest = idb.transaction(INDEXEDDB_STORE, IDBTransaction.READ_ONLY).objectStore(INDEXEDDB_STORE).get(id);
    // getRequest.onsuccess = function(evt) {
    //     loadFromJSON(getRequest.result.json);
    // };
}

function removeAProject(md5) {
    _database.transaction(function(tx) {
        tx.executeSql('DELETE FROM projects WHERE md5="' + md5 + '"');
        if(_currentPlace == SHOW_PROJECTS) {
            readProjects('options_field_output');
        }
    });

    // idb.transaction(INDEXEDDB_STORE, IDBTransaction.READ_WRITE).objectStore(INDEXEDDB_STORE).delete(id).onsuccess = function(evt) {
    //     if(_currentPlace == SHOW_PROJECTS) {
    //         readProjects('options_field_output');
    //     }
    // };
}

function saveAProject(inputName, inputJson) {
    var json = inputJson;
    _database.transaction(function(tx) {
        var md5 = MD5(new Date() + inputName);
        tx.executeSql('INSERT INTO projects (md5, name, json) VALUES (\'' + md5 + '\', \'' + inputName + '\', \'' + json + '\')');
        showNotificationInDashboard(inputName + " has been saved.");
    });

    // idb.transaction(INDEXEDDB_STORE, IDBTransaction.READ_WRITE).objectStore(INDEXEDDB_STORE).add({name: inputName, json: json}).onsuccess = function(evt) {
    //     showNotificationInDashboard(inputName + " has been saved.");
    // };
}

function saveAProjectFromDialog() {
    var name = $('#save_project_name_input').val();
    var json = getFeedsJSON();
    saveAProject(name, json);
}

function propertiesPanelShowRestFeed(service) {
    var name = service.getName();
    var url = service.getRestUrl();
    var method = service.getRestMethod();
    var id = service.getId();

    var feed_method_html = '';
    if(method == 'get' || method == 'GET') {
        feed_method_html = '<input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_get" checked="true" /><label for="properties_panel_rest_feed_method_get">Read</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_post" /><label for="properties_panel_rest_feed_method_post">Update</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_put"/><label for="properties_panel_rest_feed_method_put">Create</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_delete"/><label for="properties_panel_rest_feed_method_delete">Destroy</label>';
    }
    else if(method == 'post' || method == 'POST') {
        feed_method_html = '<input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_get" /><label for="properties_panel_rest_feed_method_get">Read</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_post" checked="true" /><label for="properties_panel_rest_feed_method_post">Update</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_put"/><label for="properties_panel_rest_feed_method_put">Create</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_delete"/><label for="properties_panel_rest_feed_method_delete">Destroy</label>';
    }
    else if(method == 'put' || method == 'PUT') {
        feed_method_html = '<input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_get" /><label for="properties_panel_rest_feed_method_get">Read</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_post" /><label for="properties_panel_rest_feed_method_post">Update</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_put" checked="true"/><label for="properties_panel_rest_feed_method_put">Create</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_delete"/><label for="properties_panel_rest_feed_method_delete">Destroy</label>';
    }  
    else if(method == 'delete' || method == 'DELETE') {
        feed_method_html = '<input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_get" /><label for="properties_panel_rest_feed_method_get">Read</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_post" /><label for="properties_panel_rest_feed_method_post">Update</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_put" /><label for="properties_panel_rest_feed_method_put">Create</label><br/><input type="RADIO" name="rest_feed_method" id="properties_panel_rest_feed_method_delete" checked="true"/><label for="properties_panel_rest_feed_method_delete">Destroy</label>';
    }  

    // document.getElementById('properties_panel_output').innerHTML = '<table class="properties_panel_table"><tr><td>Name:<br/><input type="TEXT" class="input_box" disabled="disabled" value="' + name + '"/></td></tr><tr><td>URL:<br/><input type="TEXT" class="input_box" disabled="disabled" value="' + url + '"></td></tr><tr><td><form>Method:<br/><div style="margin-left: 30px;">' + feed_method_html + '</div></form></td></tr><tr><td style="vertical-align: top;"><div class="div_push_button" onclick="applyRestMethodUpdate(' + id + ')">Apply</div></td></tr></table>';

    document.getElementById('properties_panel_output').innerHTML = '<table class="properties_panel_table"><tr><td>Name:<br/><input type="TEXT" class="input_box" disabled="disabled" value="' + name + '"/></td></tr><tr><td>URL:<br/><input type="TEXT" class="input_box" disabled="disabled" value="' + url + '"></td></tr><tr><td><form>Method:<br/><div style="margin-left: 30px;">' + feed_method_html + '</div></form></td></tr></table>';

    $("input[name='rest_feed_method']").click(function() {
        applyRestMethodUpdate(id);
    });
}

function applyRestMethodUpdate(id) {
    var method;
    if(document.getElementById('properties_panel_rest_feed_method_get').checked) {
        method = REST_METHOD_GET;
    }
    else if(document.getElementById('properties_panel_rest_feed_method_post').checked) {
        method = REST_METHOD_POST;
    }
    else if(document.getElementById('properties_panel_rest_feed_method_put').checked) {
        method = REST_METHOD_PUT;
    }
    else if(document.getElementById('properties_panel_rest_feed_method_delete').checked) {
        method = REST_METHOD_DELETE;
    }
    updateRestMethodById(id, method);
}
