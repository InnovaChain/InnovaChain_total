import os

assets_dirs_root = "./src/assets"

def get_all_subdirs(root_dir):
  subdirs = [root_dir]
  for item in os.listdir(root_dir):
    item_path = os.path.join(root_dir, item)
    if os.path.isdir(item_path):
      subdirs.extend(get_all_subdirs(item_path))
  return subdirs

assets_dirs = get_all_subdirs(assets_dirs_root)

def removeExt(file: str):
  return file.split(".")[0]

def capitalizeFirstLetter(name: str):
  if len(name) > 0 and name[0].isdigit():
    name = "_" + name
  name_li = name.split("-")
  res = ""
  for n in name_li:
    if len(n) == 1:
      res += n[0].upper()
    elif len(n) > 1:
      res += n[0].upper() + n[1:]
    else:
      pass
  return res

def imageFileValidate(file: str):
  return file.endswith(".svg") or file.endswith(".png") or file.endswith(".jpg") or file.endswith(".jpeg")

for assets_dir in assets_dirs:
  files = list(filter(lambda file: file != 'index.ts', os.listdir(assets_dir)))

  with open(os.path.join(assets_dir, "index.ts"), 'w') as f:
    for file in files:
      if imageFileValidate(file):
        f.write(f"import {capitalizeFirstLetter(removeExt(file))}Img from \"./{file}\";\n")
    f.write("\n")
    f.write("export {\n")
    for file in files:
      if imageFileValidate(file):
        f.write(f"  {capitalizeFirstLetter(removeExt(file))}Img,\n")
    f.write("};\n")
