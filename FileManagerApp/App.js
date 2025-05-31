import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// ───── Константи ─────
const ROOT_DIR = FileSystem.documentDirectory + 'AppData';

// ───── Допоміжні ─────
async function ensureRootDir() {
  const dir = await FileSystem.getInfoAsync(ROOT_DIR);
  if (!dir.exists) await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
}
const fmtBytes = (b) => {
  if (!b) return '0 B';
  const k = 1024, dm = 1, sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(b) / Math.log(k));
  return parseFloat((b / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// ───── Екран файлового менеджера ─────
function FileManager({ navigation }) {
  const [path, setPath] = useState(ROOT_DIR);
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('folder'); // folder | file
  const [disk, setDisk] = useState({ free: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const refresh = async (p = path) => {
    setLoading(true);
    await ensureRootDir();
    const list = await FileSystem.readDirectoryAsync(p);
    const data = await Promise.all(
      list.map(async (n) => {
        const uri = `${p}/${n}`;
        const info = await FileSystem.getInfoAsync(uri);
        return {
          key: uri,
          name: n,
          dir: info.isDirectory,
          size: info.isDirectory ? null : info.size,
          mod: info.modificationTime && new Date(info.modificationTime * 1000),
        };
      })
    );
    setItems(data.sort((a, b) => Number(b.dir) - Number(a.dir)));
    const [free, total] = await Promise.all([
      FileSystem.getFreeDiskStorageAsync(),
      FileSystem.getTotalDiskCapacityAsync(),
    ]);
    setDisk({ free, total });
    setLoading(false);
  };

  useEffect(() => { refresh(); }, [path]);

  const del = (it) =>
    Alert.alert('Видалити', `Видалити «${it.name}»?`, [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Так', style: 'destructive', onPress: async () => {
          await FileSystem.deleteAsync(it.key, { idempotent: true });
          refresh();
        },
      },
    ]);

  const create = async () => {
    const target = `${path}/${name.trim()}`;
    if (!name.trim()) return;
    try {
      if (type === 'folder') await FileSystem.makeDirectoryAsync(target);
      else await FileSystem.writeAsStringAsync(
        target.endsWith('.txt') ? target : `${target}.txt`,
        'Новий файл…'
      );
      setModal(false); setName(''); refresh();
    } catch (e) { Alert.alert('Помилка', e.message); }
  };

  const up = () => {
    if (path === ROOT_DIR) return;
    setPath(path.substring(0, path.lastIndexOf('/')) || ROOT_DIR);
  };

  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => item.dir ? setPath(item.key)
        : navigation.navigate('Editor', { uri: item.key, name: item.name })}
      onLongPress={() => del(item)}
    >
      <Ionicons name={item.dir ? 'folder' : 'document-text'} size={20} style={styles.icon} />
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity onPress={() =>
        Alert.alert('Інфо', [
          `Назва: ${item.name}`,
          `Тип: ${item.dir ? 'папка' : item.name.split('.').pop()}`,
          item.size !== null ? `Розмір: ${fmtBytes(item.size)}` : '',
          item.mod ? `Змінено: ${item.mod.toLocaleString()}` : '',
        ].join('\n'))}>
        <Ionicons name="information-circle-outline" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Шлях + «вгору» */}
      <View style={styles.breadcrumb}>
        <TouchableOpacity disabled={path === ROOT_DIR} onPress={up}>
          <Ionicons name={path === ROOT_DIR ? 'home' : 'arrow-up'} size={22} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.path}>{path.replace(ROOT_DIR, '📁 /')}</Text>
      </View>

      {/* Статистика */}
      <View style={styles.stats}>
        <Text>Зайнято: {fmtBytes(disk.total - disk.free)}</Text>
        <Text>Вільно: {fmtBytes(disk.free)}</Text>
        <Text>Усього: {fmtBytes(disk.total)}</Text>
      </View>

      {loading ? <ActivityIndicator size="large" style={{ marginTop: 40 }} /> :
        <FlatList data={items} renderItem={Item} />}
      {/* FAB-и */}
      <View style={styles.fabBox}>
        <TouchableOpacity style={styles.fab}
          onPress={() => { setType('folder'); setModal(true); }}>
          <Ionicons name="add-circle" size={32} />
          <Text style={styles.fabLabel}>Папка</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab}
          onPress={() => { setType('file'); setModal(true); }}>
          <Ionicons name="document-text-outline" size={32} />
          <Text style={styles.fabLabel}>.txt</Text>
        </TouchableOpacity>
      </View>

      {/* Модалка */}
      <Modal transparent animationType="slide" visible={modal}>
        <View style={styles.modalWrap}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {type === 'folder' ? 'Нова папка' : 'Новий .txt файл'}
            </Text>
            <TextInput
              placeholder="Введіть назву"
              style={styles.input}
              value={name}
              autoFocus
              onChangeText={setName}
              onSubmitEditing={create}
            />
            <View style={styles.modalBtns}>
              <TouchableOpacity onPress={() => setModal(false)}>
                <Text style={styles.btn}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={create}>
                <Text style={styles.btn}>Створити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ───── Екран редактора ─────
function Editor({ route, navigation }) {
  const { uri, name } = route.params;
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: name });
    FileSystem.readAsStringAsync(uri).then(setText).finally(() => setLoading(false));
  }, []);

  const save = async () => {
    await FileSystem.writeAsStringAsync(uri, text);
    Alert.alert('Збережено', 'Файл успішно збережено.');
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.editor}>
      <TextInput
        style={styles.editorInput}
        value={text}
        onChangeText={setText}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.saveBtn} onPress={save}>
        <Ionicons name="save" size={22} style={styles.icon} />
        <Text style={styles.btn}>Зберегти</Text>
      </TouchableOpacity>
    </View>
  );
}

// ───── Навігація ─────
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Files" component={FileManager} options={{ title: 'Файловий менеджер' }}/>
        <Stack.Screen name="Editor" component={Editor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ───── Стилі ─────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  breadcrumb: { flexDirection: 'row', alignItems: 'center', padding: 6, backgroundColor: '#f4f4f4' },
  path: { flex: 1, fontSize: 12 },
  stats: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 4, backgroundColor: '#e7e7e7' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
  icon: { marginRight: 8 },
  name: { flex: 1 },
  fabBox: { position: 'absolute', right: 10, bottom: 20 },
  fab: { alignItems: 'center', marginVertical: 6 },
  fabLabel: { fontSize: 10 },
  modalWrap: { flex: 1, backgroundColor: '#0005', justifyContent: 'center', padding: 24 },
  modal: { backgroundColor: '#fff', borderRadius: 8, padding: 16 },
  modalTitle: { fontSize: 18, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 4, padding: 8, marginBottom: 12 },
  modalBtns: { flexDirection: 'row', justifyContent: 'flex-end' },
  btn: { fontSize: 16, marginHorizontal: 8 },
  editor: { flex: 1 },
  editorInput: { flex: 1, padding: 12 },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, backgroundColor: '#f4f4f4' },
});
